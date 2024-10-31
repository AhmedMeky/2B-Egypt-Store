namespace _2B_Egypt.AdminDashboard.Controllers;
[Authorize]
public class ProductController : Controller
{
    private readonly IProductService _productService;
    private readonly IBrandService _brandService;
    private readonly ICategoryService _categoryService;
    private readonly IFacilityService _facilityService;
    private readonly IWebHostEnvironment _webHostEnvironment;
    public ProductController(
        IProductService productService,
        IBrandService brandService,
        ICategoryService categoryService,
        IFacilityService facilityService,
    IWebHostEnvironment webHostEnvironment)
    {
        _productService = productService;
        _brandService = brandService;
        _categoryService = categoryService;
        _facilityService = facilityService;
        _webHostEnvironment = webHostEnvironment;
    }
    public async Task<IActionResult> Index()
    {
        var products = await _productService.GetAllAsync();
        return View(products);
    }

    [HttpGet]
    public async Task<IActionResult> Create()
    {
        var categories = (await _categoryService.GetAllAsync()).Entity;
        ViewBag.categories = new SelectList(categories, "Id", "NameEn");
        var brands = await _brandService.GetAllAsync();
        ViewBag.brands = new SelectList(brands, "Id", "NameEn");
        var facilities = await _facilityService.GetAllAsync();
        ViewBag.facilities = facilities.Entity;
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDTO product, List<IFormFile> images, Guid[] facilities)
    {
        foreach (IFormFile image in images)
        {
            if (image.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "img");
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }
                CreateImageWithPraductDTO createImage = new();
                createImage.ImageUrl = "/img/" + uniqueFileName;
                product.Images.Add(createImage);
            }
        }
        foreach (var id in facilities)
        {
            var fac = await _facilityService.GetByIdAsync(id);
            product.Facilities.Add(fac.Entity);
        }
        if (ModelState.IsValid && product.Images.Count() != 0)
        {
            var productResponse = await _productService.CreateAsync(product);
            if (productResponse.IsSuccessfull)
                return RedirectToAction("Index");
            else
                return View("Error404", productResponse.Message);
        }

        return RedirectToAction("Create", product);
    }

    [HttpGet]
    public async Task<IActionResult> Details(Guid id)
    {
        var productRespone = await _productService.GetByIdAsync(id);
        if (!productRespone.IsSuccessfull)
        {
            return View("Error404");
        }
        return View(productRespone.Entity);
    }

    [HttpGet]
    public async Task<IActionResult> Update(Guid id)
    {
        var productResponse = await _productService.GetOneByIdAsync(id);
        var categories = (await _categoryService.GetAllAsync()).Entity;
        ViewBag.categories = new SelectList(categories, "Id", "NameEn", productResponse.Entity.CategoryId);
        var brands = await _brandService.GetAllAsync();
        ViewBag.brands = new SelectList(brands, "Id", "NameEn", productResponse.Entity.BrandId);
        var facilities = await _facilityService.GetAllAsync();
        ViewBag.facilities = facilities.Entity;
        return View(productResponse.Entity);
    }

    [HttpPost]
    public async Task<IActionResult> Update(CreateProductDTO product, List<IFormFile> images)
    {
        product.Images = [];
        foreach (IFormFile image in images)
        {
            if (image.Length > 0)
            {
                var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "img");
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + image.FileName;
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }
                CreateImageWithPraductDTO createImage = new();
                createImage.ImageUrl = "/img/" + uniqueFileName;
                product.Images.Add(createImage);
            }
        }
        //foreach (var fId in facilities)
        //{
        //    var fac = await _facilityService.GetByIdAsync(fId);
        //    product.Facilities.Add(fac.Entity);
        //}
        if (ModelState.IsValid && product.Images.Count() != 0)
        {
            var productResponse = await _productService.UpdateAsync(product);
            
            if (productResponse.IsSuccessfull)
                return RedirectToAction("Index");
            else
                return View("Error404", productResponse.Message);
        }

        return RedirectToAction("Update", product);
    }

    public async Task<IActionResult> Delete(Guid id, bool isSoftDelete = true)
    {

        if (isSoftDelete)
        {
            await _productService.SoftDeleteAsync(id);
        }
        else
        {
            await _productService.HardDeleteAsync(id);
        }

        return RedirectToAction(nameof(Index));
    }
}
