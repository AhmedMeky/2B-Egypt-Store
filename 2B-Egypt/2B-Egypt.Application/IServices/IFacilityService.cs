namespace _2B_Egypt.Application.IServices;

public interface IFacilityService
{
   public Task<ResponseDTO<CreateFacilityDTO>> CreateAsync(CreateFacilityDTO Facility);
    public Task<ResponseDTO<List<CreateFacilityDTO>>> GetAllAsync();
    public Task<CreateFacilityDTO> HardDeleteAsync(Facility facility);


}