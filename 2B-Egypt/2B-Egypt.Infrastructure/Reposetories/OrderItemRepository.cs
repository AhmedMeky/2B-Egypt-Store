namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class OrderItemRepository : GenericRepository<OrderItem, Guid>, IOrderItemRepository
    {
        private readonly AppDbContext _context;

        public OrderItemRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}