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
        public async Task<ActionResult<GetAllProductDTO>> GetProducts()
        {
            var products = await _productService.GetAllAsync();

            return Ok(products);
        }

        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<GetAllProductDTO>>> GetProducts()
        //{
        //    var products = await _productService.GetAllAsync();

        //    foreach (var product in products)
        //    {
        //        if (product.Images != null && product.Images.Count > 0)
        //        {
        //            foreach (var image in product.Images)
        //            {
        //                image.ImageUrl = $"{Request.Scheme}://{Request.Host}/img/{image.ImageUrl}"; 
        //            }
        //        }
        //    }

        //    return Ok(products);
        //}




    }
}

