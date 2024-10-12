namespace _2B_Egypt.Application.IServices;

public interface IProductService
{
    Task<ResponseDTO<CreateProductDTO>> CreateAsync(CreateProductDTO product);

}