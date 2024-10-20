using _2B_Egypt.Application.IRepositories;
using _2B_Egypt.Application.IServices;
using _2B_Egypt.Application.Services;
using _2B_Egypt.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Egypt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public ProductsController(IProductService productService, IWebHostEnvironment webHostEnvironment)
        {
            _productService = productService;
            _webHostEnvironment = webHostEnvironment;

        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _productService.GetAllAsync();
            return Ok(products);
        }
        [HttpGet("{id}")]

        public async Task<ActionResult<Product>> GetProductById(Guid id)
        {
            var product = await _productService.GetByIdAsync(id);
            if (product != null)
            {
                return Ok(product.Entity);
            }
            return NotFound();
        }




    }
}

