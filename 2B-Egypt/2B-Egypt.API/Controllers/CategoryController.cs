using _2B_Egypt.Application.DTOs;
using _2B_Egypt.Application.DTOs.CategoryDTOs;
using _2B_Egypt.Application.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Egypt.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }
        [HttpGet("getAllCategories")]
        public async Task<ActionResult> GetAllCategories()
        {

            ResponseDTO< List<CreateCategoryDTO>> categories
                    = await _categoryService.GetAllAsync(); 
            return Ok(categories.Entity);
        }
        [HttpGet("ParentCategories")]
        public async Task<ActionResult> GetAllParentCategories()
        {

            var categories= await _categoryService.GetAllParent();
            return Ok(categories.Entity);
        }
        [HttpGet("SubCategoriesForOneCategory")]
        public async Task<ActionResult> GetAllSubCategories(Guid id)
        {

            var categories=await _categoryService.GetAllSubCategories(id);
            return Ok(categories.Entity);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetByID(Guid id)
        {
            ResponseDTO<CreateCategoryDTO> response = await _categoryService.GetByIdAsync(id);
            if (response.IsSuccessfull)
            {
                return Ok(response.Entity);
            }
            else
            {
                return NotFound(response.Entity); 
            }
        }
        

    }
}
