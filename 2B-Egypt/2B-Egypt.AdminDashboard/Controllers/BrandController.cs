using _2B_Egypt.Application.DTOs.BrandDTOs;
using _2B_Egypt.Application.IServices;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Egypt.AdminDashboard.Controllers
{
    public class BrandController : Controller
    {
        private readonly IBrandService _brandService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public BrandController(IBrandService brandService, IWebHostEnvironment webHostEnvironment)
        {
            _brandService = brandService;
            _webHostEnvironment = webHostEnvironment;
        }

        public IActionResult Create()
        {
            return View();
        }

        public async Task<IActionResult> Create(CreateBrandDTO brand)
        {
            var brandResponse = await _brandService.CreateAsync(brand);
            if(brandResponse.IsSuccessfull)
                return View("Index", brandResponse.Entity);
            else 
                return Content(brandResponse.Message);
        }

        public IActionResult Index()
        {
            return View();
        }

    }
}
