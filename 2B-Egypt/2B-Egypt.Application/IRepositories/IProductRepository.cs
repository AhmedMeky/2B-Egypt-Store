namespace _2B_Egypt.Application.IRepositories;

public interface IProductRepository : IGenericRepository<Product, Guid>
{
    
    Task<IQueryable<Product>> SearchByNameAsync(string name);
    Task<IQueryable<Product>> SearchByCategoryNameAsync(string categoryName);
    Task<IQueryable<Product>> SearchByBrandNameAsync(string brandName);
    Task<List<Product>> GetProductsByCategoryID(Guid categoryId);
}