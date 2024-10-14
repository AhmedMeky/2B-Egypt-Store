using _2B_Egypt.AdminDashboard.Models;

namespace _2B_Egypt.AdminDashboard.Controllers
{
    public class CategoryController : Controller
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService; 
        }

        public async Task<IActionResult> Index()
        {
            var response = await _categoryService.GetAllAsync();
            return View(response.Entity.ToList());
            //if (response.IsSuccessfull)
            //    return View(categoryList);
            //return View("Forbidden");
        }

        [ResponseCache(Duration =3600, Location = ResponseCacheLocation.Client, NoStore = true)]

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var categories = (await _categoryService.GetAllAsync()).Entity;
            ViewBag.Categories = new SelectList(categories,"Id","NameEn");
            return View();
        }

        [HttpPost]
        public async Task< IActionResult> Create(CreateCategoryDTO CategoryDTO)
        {
            if (ModelState.IsValid)
            {
                var response =  await _categoryService.CreateAsync(CategoryDTO);
                if(response.IsSuccessfull)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    return View("Error", response.Message);
                }
            } 
	        return View("Create", CategoryDTO);
        }


        [HttpGet]
        public async Task<IActionResult> Update(Guid id)
        {
            var response = await _categoryService.GetByIdAsync(id);
            if(!response.IsSuccessfull)
            {
                return View("Error", response.Message);
            }
            var categories = (await _categoryService.GetAllAsync()).Entity;
            ViewBag.Categories = new SelectList(categories, "Id", "NameEn");
            return View(response.Entity);
        }


        [HttpPost]
        public async Task<IActionResult> Update(CreateCategoryDTO category)
        {
            if (!ModelState.IsValid)
            {
                return View(category);
            }
            var result = await _categoryService.UpdateAsync(category);
            if (result.IsSuccessfull)
            {
                return RedirectToAction(nameof(Index));
            }
            ModelState.AddModelError(string.Empty, result.Message);
            return View(category);
        }

        public async Task<IActionResult> Delete(Guid id, bool isSoftDelete = true)
        {

            if (isSoftDelete)
            {
                await _categoryService.SoftDeleteAsync(id);
            }
            else
            {
                await _categoryService.HardDeleteAsync(id);
            }

            return RedirectToAction(nameof(Index));
        }
    }
}
