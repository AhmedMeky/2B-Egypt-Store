﻿using _2B_Egypt.Application.IRepositories;
using _2B_Egypt.Application.IServices;
using _2B_Egypt.Application.Services;
using _2B_Egypt.Domain.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using _2B_Egypt.Application.DTOs;
using _2B_Egypt.Application.DTOs.ProductDTO;


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
        public async Task<ActionResult<List<GetProductDTO>>> GetProducts()
        {
            var products = await _productService.GetAllAsync();

            return Ok(products);
        }

        [HttpGet("productsWithPagination")]
        public async Task<IActionResult> GetProductsWithPagination(int pageNumber = 1, int pageSize = 20)
        {
            var products = await _productService.GetAllPaginationAsync(pageNumber, pageSize);
            return Ok(products);
        }
        [HttpGet("productsByCategory")]
        public async Task<IActionResult> GetProductsByCategoryIdWithPagination(Guid categoryId, int pageNumber = 1, int pageSize = 20)
        {
            
            if (categoryId == Guid.Empty)
            {
                return BadRequest("Category ID cannot be null or empty.");
            }

            var pagedResult = await _productService.GetProductsByCategoryIdWithPaginationAsync(categoryId, pageNumber, pageSize);

            return Ok(pagedResult);
        }


        [HttpGet("category/{categoryId}")]
        public async Task<ActionResult<List<GetProductDTO>>> GetProductsByCategoryID(Guid categoryId)
        {
            
            var products = await _productService.GetByCategoryIdAsync(categoryId);
            if (products == null || products.Count == 0)
            {
                return NotFound($"No products found for category ID {categoryId}");
            }
            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<GetAllProductDTO>> GetProductById(Guid id)
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


