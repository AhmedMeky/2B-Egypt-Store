namespace _2B_Egypt.AdminDashboard.Controllers;
public class ProductController : Controller
{
    private readonly IProductService _productService;
    private readonly IBrandService _brandService;
    private readonly ICategoryService _categoryService;
    private readonly IWebHostEnvironment _webHostEnvironment;
    public ProductController(
        IProductService productService,
        IBrandService brandService,
        ICategoryService categoryService,
        IWebHostEnvironment webHostEnvironment)
    {
        _productService = productService;
        _brandService = brandService;
        _categoryService = categoryService;
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
        return View();
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDTO product, List<IFormFile> images)
    {
        if(images is not null)
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
        }
        if (ModelState.IsValid)
        {
            var productResponse = await _productService.CreateAsync(product);
            if (productResponse.IsSuccessfull)
                return View("Index", productResponse.Entity);
            else
                return View("Error", productResponse.Message);
        }
        return View("Forbidden");
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
