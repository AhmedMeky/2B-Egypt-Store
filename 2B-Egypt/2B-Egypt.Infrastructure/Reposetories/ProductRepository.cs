
namespace _2B_Egypt.Infrastructure.Reposetories;

public class ProductRepository : GenericRepository<Product, Guid>, IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<IQueryable<Product>> SearchByBrandNameAsync(string brandName)
    {
        return await Task.FromResult(_context.Products.Include(prd => prd.Brand)
            .Where(prd => prd.Brand.NameEn.ToLower().Contains(brandName.ToLower())
            || prd.Brand.NameAr.ToLower().Contains(brandName.ToLower())));
    }

    public async Task<IQueryable<Product>> SearchByCategoryNameAsync(string categoryName)
    {
        return await Task.FromResult(  _context.Products.Include(prd => prd.Category)
            .Where(prd => prd.Category.NameEn.ToLower().Contains(categoryName.ToLower())
            || prd.Category.NameAr.ToLower().Contains(categoryName.ToLower())));
    }

    public async Task<IQueryable<Product>> SearchByNameAsync(string name)
    {
        return await Task.FromResult(
        _context.Products.Where(product => product.NameAr.Contains(name.ToLower())
                || product.NameEn.ToLower().Contains(name.ToLower()))
            );
    }
}