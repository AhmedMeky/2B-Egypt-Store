namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class CategoryRepository : GenericRepository<Category, Guid> , ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}