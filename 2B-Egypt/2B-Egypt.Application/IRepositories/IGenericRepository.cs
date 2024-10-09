namespace _2B_Egypt.Application.IRepositories;
public interface IGenericRepository<TEntity,TId> where TEntity : BaseEntity
{
    Task<IQueryable<TEntity>> GetAllAsync();
    Task<TEntity> GetByIdAsync(TId id, string[] includes = null!);
    Task<TEntity> GetByIdAsync(TId id);
    Task<TEntity> CreateAsync(TEntity entity);
    Task<TEntity> UpdateAsync(TEntity entity);
    Task<TEntity> HardDeleteAsync(TEntity entity);
    Task<TEntity> SoftDeleteAsync(TEntity entity);
    Task<bool> ExistsAsync(TId entity);
    Task<int> SaveChangesAsync();
}