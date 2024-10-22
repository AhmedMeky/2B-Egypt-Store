namespace _2B_Egypt.Application.IServices;

public interface IFacilityService
{
   public Task<ResponseDTO<CreateFacilityDTO>> CreateAsync(CreateFacilityDTO Facility);
    public Task<ResponseDTO<List<CreateFacilityDTO>>> GetAllAsync();
    Task<ResponseDTO<CreateFacilityDTO>> GetByIdAsync(Guid id);
    public Task HardDeleteAsync(Guid id);
    public Task SoftDeleteAsync(Guid id);
}