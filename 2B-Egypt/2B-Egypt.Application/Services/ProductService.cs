using Microsoft.EntityFrameworkCore;

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

    // Create a new Product
    public async Task<ResponseDTO<CreateProductDTO>> CreateAsync(CreateProductDTO productDTO)
    {
        if(productDTO is null)
        {
            return new ResponseDTO<CreateProductDTO>() { Entity = null, IsSuccessfull = false, Message = "Not Valid Values" };
        }
        var product = mapper.Map<Product>(productDTO);
        product.Id = Guid.NewGuid();
        product.CreatedAt = DateTime.Now;
        foreach(var image in product.Images)
        {
            image.Id = Guid.NewGuid();
            image.CreatedAt = DateTime.Now;
        }
        product = await productRepository.CreateAsync(product);
        await productRepository.SaveChangesAsync();
        return new ResponseDTO<CreateProductDTO>() { Entity = mapper.Map<CreateProductDTO>(product), IsSuccessfull = true, Message = "The Product Created" };
    }

    // get all products 
    public async Task<List<GetProductDTO>> GetAllAsync()
    {

        var products = (await productRepository.GetAllAsync())
                    .Include(prd => prd.Images)
                    .Include(prd => prd.Category)
                    .Include(prd => prd.Brand)
                    .Where(prd => !prd.IsDeleted)
                    .ToList();
        return mapper.Map<List<GetProductDTO>>(products);
    }

    // get the details of a specific product by its Id
    public async Task<ResponseDTO<GetAllProductDTO>> GetByIdAsync(Guid id)
    {
        var product = (await productRepository.GetByIdAsync(id,["Images","Category","Brand", "Reviews", "Facilities"]));
        if(product is null)
        {
            return new ResponseDTO<GetAllProductDTO>()
            {
                Entity = null!,
                IsSuccessfull = false,
                Message = "There is no product with this Id"
            };
        }
        return new ResponseDTO<GetAllProductDTO>()
        {
            Entity = mapper.Map<GetAllProductDTO>(product),
            IsSuccessfull = true
        };
    }

    // get all products in a specific Category
    public async Task<List<GetProductDTO>> GetByCategoryIdAsync(Guid categoryId)
    {
        var products = (await productRepository.GetAllAsync())
                    .Include(prd => prd.Images)
                    .Include(prd => prd.Category)
                    .Include(prd => prd.Brand)
                    .Where(prd => !prd.IsDeleted && prd.CategoryId.Equals(categoryId))
                    .ToList();
        return mapper.Map<List<GetProductDTO>>(products);
    }
    // get all products in a specific Brand
    public async Task<List<GetProductDTO>> GetByBrandIdAsync(Guid brandId)
    {
        var products = (await productRepository.GetAllAsync())
                    .Include(prd => prd.Images)
                    .Include(prd => prd.Category)
                    .Include(prd => prd.Brand)
                    .Where(prd => !prd.IsDeleted && prd.BrandId.Equals(brandId))
                    .ToList();
        return mapper.Map<List<GetProductDTO>>(products);
    }

    // get products in a specific Price range
    public async Task<List<GetProductDTO>> GetByPriceRangeAsync(decimal min, decimal max)
    {
        var products = (await productRepository.GetAllAsync())
                    .Include(prd => prd.Images)
                    .Include(prd => prd.Category)
                    .Include(prd => prd.Brand)
                    .Where(prd => !prd.IsDeleted && prd.Price >= min && prd.Price <= max)
                    .ToList();
        return mapper.Map<List<GetProductDTO>>(products);
    }

    // get product which has a descount more than or equal a specific value
    public async Task<List<GetProductDTO>> GetByDiscountRangeAsync(int discount)
    {
        var products = (await productRepository.GetAllAsync())
                    .Include(prd => prd.Images)
                    .Include(prd => prd.Category)
                    .Include(prd => prd.Brand)
                    .Where(prd => !prd.IsDeleted && prd.Discount >= discount)
                    .ToList();
        return mapper.Map<List<GetProductDTO>>(products);
    }

    public Task<ResponseDTO<CreateProductDTO>> UpdateAsync(CreateProductDTO product)
    {
        throw new NotImplementedException();
    }

    public async Task SoftDeleteAsync(Guid id)
    {
        var prodcut = await productRepository.GetByIdAsync(id);
        if (prodcut != null)
        {
            prodcut.IsDeleted = true;
            prodcut.DeletedAt = DateTime.Now;
            await productRepository.UpdateAsync(prodcut);
            await productRepository.SaveChangesAsync();
        }
    }

    public async Task HardDeleteAsync(Guid id)
    {
        var prodcut = await productRepository.GetByIdAsync(id);
        if (prodcut != null)
        {
            await productRepository.HardDeleteAsync(prodcut);
            await productRepository.SaveChangesAsync();
        }
    }
    public async Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByBrandNameAsync(string brandName)
    {
        throw new NotImplementedException();
    }

    public Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByCategoryNameAsync(string categoryName)
    {
        throw new NotImplementedException();
    }

    public Task<IQueryable<ResponseDTO<CreateProductDTO>>> SearchByNameAsync(string name)
    {
        throw new NotImplementedException();
    }

}