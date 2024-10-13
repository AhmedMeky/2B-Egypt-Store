using _2B_Egypt.Application.DTOs.ProductImageDTO;
using _2B_Egypt.Domain.Models;
using Microsoft.AspNetCore.Hosting;

namespace _2B_Egypt.AdminDashboard.Controllers;

public class ProductController : Controller
{
    private readonly IProductService _productService;
    private readonly IWebHostEnvironment _webHostEnvironment;
    public ProductController(IProductService productService, IWebHostEnvironment webHostEnvironment)
    {
        _productService = productService;
        _webHostEnvironment = webHostEnvironment;
    }
    public IActionResult Index()
    {
        return View();
    }

    public async Task<IActionResult> Create() => View();

    [HttpPost]
    public async Task<IActionResult> Create(CreateProductDTO product, List<IFormFile> images)
    {
        foreach (IFormFile image in images)
        {
            if(image.Length > 0)
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
        if (ModelState.IsValid)
        {
            var productResponse = await _productService.CreateAsync(product);
            if (productResponse.IsSuccessfull)
                return View("Index", productResponse.Entity);
            else
                return View("Forbidden");
        }
        return View("Forbidden");
    }
}
