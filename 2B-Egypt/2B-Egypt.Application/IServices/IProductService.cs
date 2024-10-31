namespace _2B_Egypt.Application.IServices;

public interface IProductService
{
    Task<ResponseDTO<CreateProductDTO>> CreateAsync(CreateProductDTO product);
    Task<List<GetProductDTO>> GetAllAsync();
    Task<PagedResult<GetProductDTO>> GetProductsByCategoryIdWithPaginationAsync(Guid categoryId, int pageNumber, int pageSize);
    Task<PagedResult<GetProductDTO>> GetAllPaginationAsync(int pageNumber, int pageSize);
    Task<ResponseDTO<GetAllProductDTO>> GetByIdAsync(Guid id);
    Task<ResponseDTO<CreateProductDTO>> GetOneByIdAsync(Guid id);
    Task<List<GetProductDTO>> GetByCategoryIdAsync(Guid categoryId);
    Task<List<GetProductDTO>> GetByBrandIdAsync(Guid brandId);
    Task<List<GetProductDTO>> GetByPriceRangeAsync(decimal min,decimal max);
    Task<List<GetProductDTO>> GetByDiscountRangeAsync(int discount);
    Task<ResponseDTO<CreateProductDTO>> UpdateAsync(CreateProductDTO product);
    Task SoftDeleteAsync(Guid id);
    Task HardDeleteAsync(Guid id);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByNameAsync(string name);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByCategoryNameAsync(string categoryName);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByBrandNameAsync(string brandName);
    Task<List<GetProductDTO>> GetProductsByCategoryID(Guid categoryId);

}