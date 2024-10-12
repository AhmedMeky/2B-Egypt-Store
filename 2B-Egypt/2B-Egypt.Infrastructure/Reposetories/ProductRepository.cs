namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class ProductRepository : GenericRepository<Product, Guid>, IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}