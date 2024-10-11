using _2B_Egypt.Application.DTOs.Shared;
using System.Threading.Tasks;

namespace _2B_Egypt.Application.IServices;

public interface IBrandService
{
    Task<ResponseDTO<CreateOrUpdateBrandDTO>> CreateAsync(CreateOrUpdateBrandDTO brand);
   
    Task DeleteAsync(Guid id);
    Task<List<CreateOrUpdateBrandDTO>> GetAllAsync();
    Task<EntitypaginatedDTO<CreateOrUpdateBrandDTO>> GetAllPaginatedAsync(int pageNumber, int pageSize);
    Task<List<CreateOrUpdateBrandDTO>> SearchByNameAsync(string brandName);
    Task<ResponseDTO<CreateOrUpdateBrandDTO>> UpdateAsync(CreateOrUpdateBrandDTO brand);
    Task<CreateOrUpdateBrandDTO> GetByIdAsync(Guid id);
    Task SoftDeleteAsync(Guid id); 
    Task HardDeleteAsync(Guid id);

}
