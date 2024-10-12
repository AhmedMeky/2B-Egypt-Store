namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class OrderRepository : GenericRepository<Order, Guid>, IOrderRepository
    {
        private readonly AppDbContext _context;

        public OrderRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}