using _2B_Egypt.Application.DTOs.AdminDTOs;

namespace _2B_Egypt.Application.Mapper;

public class AutoMapperProfile : Profile
{
    public AutoMapperProfile()
    { 
	    //category 
        CreateMap<Category, CreateCategoryDTO>().ReverseMap();
        CreateMap<Category, CategoryWithRelatedProducts>().ReverseMap();
        CreateMap<Category, UpdateCategoryDTO>().ReverseMap();
        CreateMap<Category, CategoryForGetAllProductDTO>().ReverseMap();

        // Brand
        CreateMap<Brand, CreateOrUpdateBrandDTO>().ReverseMap();
        CreateMap<Brand, BrandForGetAllProductDTO>().ReverseMap();

        // Product
        CreateMap<Product, CreateProductDTO>().ReverseMap();
        CreateMap<Product, GetProductDTO>().ReverseMap();
        CreateMap<Product, GetAllProductDTO>().ReverseMap();

        //Product Image
        CreateMap<ProductImage, CreateImageWithPraductDTO>().ReverseMap();


        // Reviw
        CreateMap<Review,ReviewForGetAllProductDTO> ().ReverseMap();

        // Facilities

        CreateMap<Facility, CreateFacilityDTO>().ReverseMap();

        // Admin
        CreateMap<CreateAdminDTO, User>().ReverseMap();

    }
}
