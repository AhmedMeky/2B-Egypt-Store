using _2B_Egypt.Application.DTOs.CategoryDTOs;

namespace _2B_Egypt.Application.Mapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    { 
	//category 
        CreateMap<Category, CreateCategoryDTO>().ReverseMap();
        CreateMap<Category, CategoryWithRelatedProducts>().ReverseMap();
        CreateMap<Category, UpdateCategoryDTO>().ReverseMap();
        // Brand
        CreateMap<Brand, CreateOrUpdateBrandDTO>().ReverseMap();

        // Product
        CreateMap<Product, CreateProductDTO>().ReverseMap();

        //Product Image
        CreateMap<ProductImage, CreateImageWithPraductDTO>().ReverseMap();

    }
}
