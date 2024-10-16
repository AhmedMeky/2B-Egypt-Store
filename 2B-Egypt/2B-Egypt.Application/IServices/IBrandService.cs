namespace _2B_Egypt.Application.IServices;

public interface IBrandService
{
    Task<ResponseDTO<CreateBrandDTO>> CreateAsync(CreateBrandDTO brand);
}