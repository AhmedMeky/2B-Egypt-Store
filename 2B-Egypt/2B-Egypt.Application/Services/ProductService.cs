namespace _2B_Egypt.Application.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository productRepository;
    private readonly IMapper mapper;

    public ProductService(IProductRepository productRepository, IMapper mapper)
    {
        this.productRepository = productRepository;
        this.mapper = mapper;
    }

    
    public async Task<ResponseDTO<CreateProductDTO>> CreateAsync(CreateProductDTO productDTO)
    {
        if(productDTO is null)
        {
            return new ResponseDTO<CreateProductDTO>() { Entity = null, IsSuccessfull = false, Message = "Not Valid Values" };
        }
        var product = mapper.Map<Product>(productDTO);
        product.Id = Guid.NewGuid();
        foreach(var image in product.Images)
        {
            image.Id = Guid.NewGuid();
            image.CreatedAt = DateTime.Now;
        }
        product.CreatedAt = DateTime.Now;
        foreach(var image in product.Images)
        {
            image.CreatedAt = DateTime.Now;
        }
        product = await productRepository.CreateAsync(product);
        await productRepository.SaveChangesAsync();
        return new ResponseDTO<CreateProductDTO>() { Entity = productDTO, IsSuccessfull = true, Message = "The Product Created" };
    }

}