using System;

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
        var ExistFacility = (await _facilityRepository.GetAllAsync()).Any(f=>f.NameEn==FacilityDto.NameEn);
        if (ExistFacility)
        {
            return new ResponseDTO<CreateFacilityDTO> { Entity = null, IsSuccessfull = false, Message = "Specification Already Exist" };

        }
        else
        {
            var FacilityMapping = _mapper.Map<Facility>(FacilityDto);
            var facility = await (_facilityRepository.CreateAsync(FacilityMapping));
            var Facilitydto = _mapper.Map<CreateFacilityDTO>(facility);
            return new ResponseDTO<CreateFacilityDTO> { Entity = Facilitydto, IsSuccessfull = true, Message = "Created Successfully" };
        }
    
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
}