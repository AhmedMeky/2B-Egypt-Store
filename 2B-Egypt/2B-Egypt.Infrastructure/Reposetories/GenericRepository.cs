namespace _2B_Egypt.Infrastructure.Reposetories;

public class GenericRepository<TEntity, TId> : IGenericRepository<TEntity, TId> where TEntity : BaseEntity
{
    private readonly AppDbContext _context;
    private readonly DbSet<TEntity> _dbSet;
    public GenericRepository(AppDbContext context)
    {
        this._context = context;
        _dbSet = _context.Set<TEntity>();
    }
    public async Task<TEntity> CreateAsync(TEntity entity)
    {
        return (await _dbSet.AddAsync(entity)).Entity;
    }

    // Get All Entities Which is not marked as deleted
    public async Task<IQueryable<TEntity>> GetAllAsync()
    {
        return await Task.FromResult( _dbSet.Where(entity => entity.IsDeleted == false));
    }

    // get the entity by its Id
    public async Task<TEntity> GetByIdAsync(TId id)
    {
        return await _dbSet.FirstOrDefaultAsync(entity => entity.Id.Equals(id));
    }

    public async Task<TEntity> GetByIdAsync(TId id, string[] includes = null)
    {
        var query = _context.Set<TEntity>().AsQueryable();
        if (includes != null)
        {
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
        }
        return await query.FirstOrDefaultAsync(E => E.Id.Equals(id));
    }

    // Delete the Entity from the Database
    public  Task<TEntity> HardDeleteAsync(TEntity entity)
    {
        return  Task.FromResult(_dbSet.Remove(entity).Entity);
    }

    // Keep the Entity in the Database but mark it as deleted
    public async Task<TEntity> SoftDeleteAsync(TEntity entity)
    {
        var en = await _dbSet.FindAsync(entity);
        if (en is null)
        {
            return null!;
        }

        en.IsDeleted = true;
        en.DeletedAt = DateTime.Now;
        return en;
    }

    public async Task<TEntity> UpdateAsync(TEntity entity)
    {
        return await Task.FromResult(_dbSet.Update(entity).Entity);
    }

    // Check if Entity Exists or Not
    public async Task<bool> ExistsAsync(TId id)
    {
        return await _dbSet.AnyAsync(entity => entity.Equals(id));
    }

    public Task<int> SaveChangesAsync()
    {
        return _context.SaveChangesAsync();
    }

}