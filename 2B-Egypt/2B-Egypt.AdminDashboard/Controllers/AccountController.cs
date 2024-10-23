namespace _2B_Egypt.AdminDashboard.Controllers;
public class AccountController : Controller
{
    private readonly UserManager<User> userManager;
    private readonly SignInManager<User> signInManager;
    private readonly IMapper mapper;

    public AccountController(UserManager<User> userManager, SignInManager<User> _signInManager, IMapper mapper)
    {
        this.userManager = userManager;
        this.signInManager = _signInManager;
        this.mapper = mapper;
    }

    public IActionResult Index()
    {
        return RedirectToAction("Register");
    }

    [HttpGet]
    public async Task<IActionResult> Register()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Register(CreateAdminDTO userDTO)
    { 
        if(ModelState.IsValid)
        {
            if(await userManager.FindByEmailAsync(userDTO?.Email!) is not null)
            {
                ModelState.AddModelError("Email", "Email is already used");
                return View(userDTO);
            }
            var user = mapper.Map<User>(userDTO);
            user.UserName = user.Email;
            var result = await userManager.CreateAsync(user, userDTO?.Password!);
            if(result.Succeeded)
            {
                await signInManager.SignInAsync(user,false);
                return RedirectToAction("index", "Home");
            }
            foreach(var error in result.Errors)
            {
                ModelState.AddModelError("", error.Description);
            }
            return View(userDTO);
        }
        return View(userDTO);
    }

    public async Task<IActionResult> Login()
    {
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginDTO loginDTO)
    {
        if (ModelState.IsValid)
        {
            var user = await userManager.FindByEmailAsync(loginDTO.Email);
            if (user is null)
            {
                ModelState.AddModelError("","Email or Password is not correct");
                ViewBag.ErrorMessage = "Email or Password is not correct";
                return View(loginDTO);
            }
            if (await userManager.CheckPasswordAsync(user, loginDTO.Password))
            {
                await signInManager.SignInAsync(user, loginDTO.RememberMe);
                return RedirectToAction("index", "Home");
            }
            ModelState.AddModelError("", "Email or Password is not correct");
            ViewBag.ErrorMessage = "Email or Password is not correct";
            return View(loginDTO);
        }
        ViewBag.ErrorMessage = "Email or Password is not correct";
        return View(loginDTO);
    }

    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();
        return RedirectToAction("Login");
    }

    public async Task<ActionResult> AccessDenied()
    {
        return View("Error404");
    }
}
