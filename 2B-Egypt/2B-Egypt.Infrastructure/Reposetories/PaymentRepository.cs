namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class PaymentRepository : GenericRepository<Payment, Guid>, IPaymentRepository
    {
        private readonly AppDbContext _context;

        public PaymentRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}