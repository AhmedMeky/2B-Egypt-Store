using _2B_Egypt.Application.DTOs.CategoryDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _2B_Egypt.Application.IServices
{
    public interface ICategoryService
    {
        //Task<ResponseDTO<CreateBrandDTO>> CreateAsync(CreateBrandDTO brand);
        Task<ResponseDTO<CreateCategoryDTO>> CreateAsync(CreateCategoryDTO category);
        Task<ResponseDTO<CreateCategoryDTO>>UpdateAsync(CreateCategoryDTO category);
        Task<ResponseDTO<UpdateCategoryDTO>>UpdateAsync(UpdateCategoryDTO category);
        Task<ResponseDTO<CreateCategoryDTO>> DeleteAsync(CreateCategoryDTO category);

        Task<ResponseDTO<IQueryable<CategoryWithRelatedProducts>>> GetAllAsync();

        Task<ResponseDTO<CreateCategoryDTO>> GetByIdAsync(string categoryGUID);
        Task<ResponseDTO<CreateCategoryDTO>> GetMyParentCategoryAsync(string categoryGUID);
        Task<ResponseDTO<SubCategoryDTO>> GetAllSubCategories(string ParentCatID);
        Task<ResponseDTO<IEnumerable<ProductDTO>>> GetAllRelatedProducts(string ParentCatID);
        Task<ResponseDTO<CreateCategoryDTO>> SearchByName(string categoryName);

        Task<bool> IsExists(string categoryName); 
       
        




    }
}
