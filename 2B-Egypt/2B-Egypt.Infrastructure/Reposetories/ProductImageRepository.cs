namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class ProductImageRepository : GenericRepository<ProductImage, Guid>, IProductImageRepository
    {
        private readonly AppDbContext _context;

        public ProductImageRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}