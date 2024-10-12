using _2B_Egypt.Application.DTOs.CategoryDTOs;

namespace _2B_Egypt.Application.Mapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {

        CreateMap<Category, CreateCategoryDTO>().ReverseMap();
        CreateMap<Category, CategoryWithRelatedProducts>().ReverseMap();
        CreateMap<Category, UpdateCategoryDTO>().ReverseMap();

        CreateMap<Product, ProductDTO>().ReverseMap();
        CreateMap<Brand, CreateBrandDTO>().ReverseMap();

    }
}
