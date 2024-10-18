using _2B_Egypt.Application.IRepositories;
using AutoMapper;

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
        var facility = await _facilityRepository.CreateAsync(FacilityMapping);
        await _facilityRepository.SaveChangesAsync();
        var Facilitydto = _mapper.Map<CreateFacilityDTO>(facility);
        return new ResponseDTO<CreateFacilityDTO> { Entity = Facilitydto, IsSuccessfull = true, Message = "Created Successfully" };  
    }


    public async Task<ResponseDTO<List<CreateFacilityDTO>>> GetAllAsync()
    {
        var ListOfFacilities = (await _facilityRepository.GetAllAsync());

        var mappedFacilities = _mapper.Map<List<CreateFacilityDTO>>(ListOfFacilities.ToList());
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

    public async Task<ResponseDTO<CreateFacilityDTO>> GetByIdAsync(Guid id)
    {
        var facility = await _facilityRepository.GetByIdAsync(id);
        if (facility is null)
        {
            return new()
            {
                Entity = null,

                IsSuccessfull = false,
                Message = "There is no facility with this id"
            };
        }
        return new()
        {
            Entity = _mapper.Map<CreateFacilityDTO>(facility),
            IsSuccessfull = true,
            Message = "facility found successfully"
        };
    }

    public async Task HardDeleteAsync(Guid id)
    {
        var facility = await _facilityRepository.GetByIdAsync(id);
        if(facility is not null)
        {
            await _facilityRepository.HardDeleteAsync(facility);
            await _facilityRepository.SaveChangesAsync();
        }
    }

    public async Task SoftDeleteAsync(Guid id)
    {
        var facility = await _facilityRepository.GetByIdAsync(id);
        if (facility != null)
        {
            facility.IsDeleted = true;
            facility.DeletedAt = DateTime.Now;
            await _facilityRepository.UpdateAsync(facility);
            await _facilityRepository.SaveChangesAsync();
        }
    }
}