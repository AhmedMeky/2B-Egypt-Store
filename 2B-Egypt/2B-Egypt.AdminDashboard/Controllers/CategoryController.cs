using _2B_Egypt.Application.DTOs.CategoryDTOs;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Egypt.AdminDashboard.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CategoryController(ICategoryService categoryService,IWebHostEnvironment  webHostEnvironment)
        {
            _categoryService = categoryService; 
            _webHostEnvironment = webHostEnvironment;

        }
        [ResponseCache(Duration =3600, Location = ResponseCacheLocation.Client, NoStore = true)]

        public IActionResult AddCategory()
        {
            return View("Index");
        }
        [HttpPost]
        public async Task< IActionResult> SaveAddCategory(CreateCategoryDTO CategoryDTO)
        {
            CategoryDTO.Id = Guid.NewGuid();
            CategoryDTO.IsDeleted = false;
            CategoryDTO.CreatedAt = Convert.ToDateTime( DateTime.Now.ToString("yyyy-MM-dd HH:mm")); 


            if (CategoryDTO ==null)
            {
                return RedirectToAction("Index",CategoryDTO);
            } 
            else
            {
                if(ModelState.IsValid)
                {
                   await _categoryService.CreateAsync(CategoryDTO);
                    return RedirectToAction("AddCategory");
                } 
                else
                {
                    return View("Index", CategoryDTO);
                }
            }
        } 
        public async Task<IActionResult>GetAllCategories()
        {
            var response = await _categoryService.GetAllAsync();
            var categoryList = response.Entity.ToList(); 
            if(response.IsSuccessfull)
                return  View(categoryList);
            return View("Forbidden");
        }
    }
}
