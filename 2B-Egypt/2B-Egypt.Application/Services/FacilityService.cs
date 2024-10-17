public class FacilityService : IFacilityService
{
    private readonly IFacilityRepository _facilityRepository;
    private readonly IMapper _mapper;
    public FacilityService( IFacilityRepository facilityRepository,IMapper mapper )
    {
        _facilityRepository = facilityRepository;
        _mapper= mapper;
    }
    public async Task<ResponseDTO<CreateFacilityDTO>> CreateAsync(CreateFacilityDTO FacilityDto)
    {
        var FacilityMapping = _mapper.Map<Facility>(FacilityDto);
        FacilityMapping.Id = Guid.NewGuid();
        FacilityMapping.CreatedAt = DateTime.Now;
        var facility = await (_facilityRepository.CreateAsync(FacilityMapping));
        var Facilitydto = _mapper.Map<CreateFacilityDTO>(facility);
        return new ResponseDTO<CreateFacilityDTO> { Entity = Facilitydto, IsSuccessfull = true, Message = "Created Successfully" };  
    }


    public async Task<ResponseDTO<List<CreateFacilityDTO>>> GetAllAsync()
    {
        var ListOfFacilities = await _facilityRepository.GetAllAsync();

        var mappedFacilities = _mapper.Map<List<CreateFacilityDTO>>(ListOfFacilities);
        if (mappedFacilities != null)
        {
            return new ResponseDTO<List<CreateFacilityDTO>>
            {
                Entity = mappedFacilities,
                IsSuccessfull = true,
                Message = "Done"
            };
        }
        else
        {
            return new ResponseDTO<List<CreateFacilityDTO>>
            {
                Entity = null,
                IsSuccessfull = false,
                Message = "No Data"
            };
        }
    }

    public async Task<CreateFacilityDTO> HardDeleteAsync(Facility facility)
    {
      await  _facilityRepository.HardDeleteAsync(facility);
        var mappedfacility=_mapper.Map<CreateFacilityDTO>(facility);
        return mappedfacility;
    }

    public async Task SoftDeleteAsync(Facility facility)
    {
        if (facility != null)
        {
            facility.IsDeleted = true;
            facility.DeletedAt = DateTime.Now;
            await _facilityRepository.UpdateAsync(facility);
            await _facilityRepository.SaveChangesAsync();
        }
    }
}