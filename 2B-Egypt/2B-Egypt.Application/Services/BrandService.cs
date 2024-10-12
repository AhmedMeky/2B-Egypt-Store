
namespace _2B_Egypt.Application.Services;

public class BrandService : IBrandService
{
    private readonly IBrandRepository brandRepository;
    private readonly IMapper mapper;

    public BrandService(IBrandRepository brandRepository, IMapper mapper)
    {
        this.brandRepository = brandRepository;
        this.mapper = mapper;
    }

    public async Task<ResponseDTO<CreateBrandDTO>> CreateAsync(CreateBrandDTO brand)
    {
        // check if Brand Name Exists Before
        bool ok = (await brandRepository.BrandNameExists(brand.NameEn) || await brandRepository.BrandNameExists(brand.NameAr));
        if (ok)
        {
            return new ResponseDTO<CreateBrandDTO> { Entity = null, IsSuccessfull = false, Message = "Already Exist" };
        }
        else
        {
            brand.Id = Guid.NewGuid();
            var brMapper = mapper.Map<Brand>(brand);
            var newBrand = await brandRepository.CreateAsync(brMapper);
            await brandRepository.SaveChangesAsync();
            var brandDto = mapper.Map<CreateBrandDTO>(newBrand);
            return new ResponseDTO<CreateBrandDTO> { Entity = brandDto, IsSuccessfull = true, Message = "Created Successfully" };
        }
    }
}
