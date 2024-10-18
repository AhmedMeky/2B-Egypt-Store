namespace _2B_Egypt.AdminDashboard.Controllers;

public class AdminController : Controller
{
    private readonly UserManager<User> userManager;
    private readonly IMapper mapper;

    public AdminController(UserManager<User> userManager, IMapper mapper)
    {
        this.userManager = userManager;
        this.mapper = mapper;
    }

    public IActionResult Index()
    {
        return View();
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
            var user = mapper.Map<User>(userDTO);
            await userManager.CreateAsync(user);
        }
        return View(userDTO);
    }
}
