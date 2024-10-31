using _2B_Egypt.Application.DTOs.UserDTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Egypt.AdminDashboard.Controllers
{
    [Authorize]
    public class UserController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UserController(UserManager<User> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _mapper = mapper;
        }

        public IActionResult Index()
        {
            var users = _mapper.Map<List<GetAllUserDTO>>(_userManager.Users.ToList());
            return View(users);
        }

        public async Task<IActionResult> Delete(string email)
        {
            if (email is null)
                return View("Erro404");
            var user = await _userManager.FindByEmailAsync(email);
            if(user is null)
                return View("Erro404");
            await _userManager.DeleteAsync(user);
            return RedirectToAction("Index");
        }

        public async Task<IActionResult> Create()
        {
            return RedirectToAction("Register", "Account");
        }
    }
}