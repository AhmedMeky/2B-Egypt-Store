namespace _2B_Egypt.Application.IServices;

public interface IProductService
{
    Task<ResponseDTO<CreateProductDTO>> CreateAsync(CreateProductDTO product);
    Task<List<GetProductDTO>> GetAllAsync();
    Task<ResponseDTO<GetAllProductDTO>> GetByIdAsync(Guid id);
    Task<ResponseDTO<CreateProductDTO>> UpdateAsync(CreateProductDTO product);
    Task SoftDeleteAsync(Guid id);
    Task HardDeleteAsync(Guid id);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByNameAsync(string name);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByCategoryNameAsync(string categoryName);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByBrandNameAsync(string brandName);

}