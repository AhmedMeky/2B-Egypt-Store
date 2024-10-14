namespace _2B_Egypt.Application.IServices;

public interface IProductService
{
    Task<ResponseDTO<CreateProductDTO>> CreateAsync(CreateProductDTO product);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByNameAsync(string name);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByCategoryNameAsync(string categoryName);
    Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByBrandNameAsync(string brandName);

}