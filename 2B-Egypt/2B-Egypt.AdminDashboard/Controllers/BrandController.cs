
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
        public async Task<IActionResult> Index()
        {
            var brands = await _brandService.GetAllAsync();
            return View(brands);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateOrUpdateBrandDTO brand)
        {
            //var brandResponse = await _brandService.CreateAsync(brand);
            //if(brandResponse.IsSuccessfull)
            //    return View("Index", brandResponse.Entity);
            //else 
            //    return Content(brandResponse.Message);
            if (ModelState.IsValid)
            {
                var response = await _brandService.CreateAsync(brand);
                if (response.IsSuccessfull)
                {
                    return RedirectToAction(nameof(Index));
                }
                ModelState.AddModelError("", response.Message);
            }
            return View(brand);
        }
        //public async Task<IActionResult> Edit(Guid id)
        //{
        //    var brand = await _brandService.GetByIdAsync(id);

        //    if (brand == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(brand);
        //}

        //[HttpPost]

        //public async Task<IActionResult> Edit(CreateOrUpdateBrandDTO brand)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var response = await _brandService.UpdateAsync(brand);
        //        if (response.IsSuccessfull)
        //        {
        //            return RedirectToAction(nameof(Index));
        //        }
        //        ModelState.AddModelError("", response.Message);
        //    }
        //    return View(brand);
        //}
        [HttpGet]
        public async Task<IActionResult> Edit(Guid id)
        {
            var response = await _brandService.GetByIdAsync(id); 
            if (!response.IsSuccessfull)
            {
                return View("Error", response.Message);
            }
            return View(response.Entity); 
        }

        [HttpPost]
        public async Task<IActionResult> Edit(CreateOrUpdateBrandDTO brand)
        {
            if (!ModelState.IsValid)
            {
                return View(brand);
            }
            var result = await _brandService.UpdateAsync(brand);
            if (result.IsSuccessfull) 
            {
                return RedirectToAction(nameof(Index));
            }
            ModelState.AddModelError(string.Empty, result.Message); 
            return View(brand); 
        }

        [HttpPost]
       
        public async Task<IActionResult> Delete(Guid id, bool isSoftDelete = true)
        {
           
            if (isSoftDelete)
            {
                await _brandService.SoftDeleteAsync(id);
            }
            else
            {
                await _brandService.HardDeleteAsync(id);
            }

            return RedirectToAction(nameof(Index));
        }

        // public async Task<IActionResult> SearchByName(string name)
        // {
        //     var brands = await _brandService.GetAllAsync();
        //     return View(brands);
        // }

    }

}

