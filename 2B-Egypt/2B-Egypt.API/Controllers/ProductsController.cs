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
        

        //// POST: api/products
        //[HttpPost]
        //public async Task<ActionResult<Product>> CreateProduct(Product product)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    await _productRepository.CreateAsync(product);
        //    return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        //}

        //// PUT: api/products/{id}
        //[HttpPut("{id}")]
        //public async Task<IActionResult> UpdateProduct(Guid id, Product product)
        //{
        //    if (id != product.Id)
        //    {
        //        return BadRequest();
        //    }

        //    await _productRepository.UpdateAsync(product);
        //    return NoContent();
        //}

        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProduct(Guid id)
        //{
        //    var product = await _productRepository.GetByIdAsync(id); 
        //    if (product == null)
        //    {
        //        return NotFound(); 
        //    }

        //    await _productRepository.HardDeleteAsync(product); 
        //    return NoContent();
        //}

    }
}

