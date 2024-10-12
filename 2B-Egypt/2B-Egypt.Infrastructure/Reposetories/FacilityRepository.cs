namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class FacilityRepository : GenericRepository<Facility, Guid>, IFacilityRepository
    {
        private readonly AppDbContext _context;

        public FacilityRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
    }
}