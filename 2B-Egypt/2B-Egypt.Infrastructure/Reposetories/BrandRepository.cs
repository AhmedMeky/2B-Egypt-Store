
namespace _2B_Egypt.Infrastructure.Reposetories;

public class BrandRepository : GenericRepository<Brand, Guid>, IBrandRepository
{
    private readonly AppDbContext _context;

    public BrandRepository(AppDbContext context) : base(context)
    {
        _context = context;
    }

    public async Task<bool> BrandNameExists(string name)
    {
        return await GetAllAsync().Result.AnyAsync(brand => brand.NameEn == name || brand.NameAr == name);
    }
    public async Task<IQueryable<Brand>> SearchByNameAsync(string name)
    {
        return await Task.FromResult(
              _context.Brands.Where(brand =>
              brand.NameAr.ToLower().Contains(name.ToLower()) || brand.NameEn.ToLower().Contains(name.ToLower()))
            );
    }
}