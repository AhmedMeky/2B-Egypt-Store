namespace _2B_Egypt.Application.IServices;

public interface ICategoryService
{
    Task<ResponseDTO<CreateCategoryDTO>> CreateAsync(CreateCategoryDTO category);
    Task<ResponseDTO<CreateCategoryDTO>> GetByIdAsync(Guid id);
    Task<ResponseDTO<List<CreateCategoryDTO>>> GetAllAsync();
    Task<ResponseDTO<CreateCategoryDTO>>UpdateAsync(CreateCategoryDTO category);
    Task SoftDeleteAsync(Guid id);
    Task HardDeleteAsync(Guid id);
    Task<ResponseDTO<List<CreateCategoryDTO>>> GetAllParent();
    Task<ResponseDTO<List<CreateCategoryDTO>>> GetAllSubCategories(Guid id);

    //Task<ResponseDTO<UpdateCategoryDTO>>UpdateAsync(UpdateCategoryDTO category);
    //Task<ResponseDTO<CreateCategoryDTO>> DeleteAsync(CreateCategoryDTO category);
    //Task<ResponseDTO<IQueryable<CategoryWithRelatedProducts>>> GetAllWithRelatedProductsAsync();
    //Task<ResponseDTO<CreateCategoryDTO>> GetMyParentCategoryAsync(string categoryGUID);
    //Task<ResponseDTO<SubCategoryDTO>> GetAllSubCategories(string ParentCatID);
    //Task<ResponseDTO<IEnumerable<CreateProductDTO>>> GetAllRelatedProducts(string ParentCatID);
    //Task<ResponseDTO<CreateCategoryDTO>> SearchByName(string categoryName);
    //Task<bool> IsExists(string categoryName); 

//----------------------------------------------------------------------------------------------------------------------------------------












}
