namespace _2B_Egypt.Application.Mapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Brand, CreateBrandDTO>().ReverseMap();
    }
}
