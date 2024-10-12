namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class CartRepository : GenericRepository<Cart, Guid> , ICartRepository
    {
        private readonly AppDbContext _context;

        public CartRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}