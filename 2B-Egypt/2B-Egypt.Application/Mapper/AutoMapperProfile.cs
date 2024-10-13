namespace _2B_Egypt.Application.Mapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    {
        // Brand
        CreateMap<Brand, CreateOrUpdateBrandDTO>().ReverseMap();

        // Product
        CreateMap<Product, CreateProductDTO>().ReverseMap();

        //Product Image
        CreateMap<ProductImage, CreateImageWithPraductDTO>().ReverseMap();

    }
}
