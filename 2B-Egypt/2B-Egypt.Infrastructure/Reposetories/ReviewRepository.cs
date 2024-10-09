namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class ReviewRepository : GenericRepository<Review, Guid>, IReviewRepository
    {
        private readonly AppDbContext _context;

        public ReviewRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}