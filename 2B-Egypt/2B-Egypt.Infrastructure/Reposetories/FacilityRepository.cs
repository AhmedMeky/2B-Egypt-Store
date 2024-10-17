namespace _2B_Egypt.Infrastructure.Reposetories;
    public class FacilityRepository : GenericRepository<Facility, Guid>, IFacilityRepository
    {
        private readonly AppDbContext _context;

        public FacilityRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }
        public async Task<Facility> CreateAsync(Facility facility)
        {
            return await base.CreateAsync(facility);
            // var ListOfFacilities =await _context.Facilities.FirstOrDefaultAsync(F => F.Id==facility.Id);
            // if (ListOfFacilities != null)
            // {
            //     return null;
            // }
            // else
            // {
            //     await _context.Facilities.AddAsync(facility);
            //     await _context.SaveChangesAsync();
            //     return facility;
            // }
         
        }
        public async Task<IQueryable<Facility>> GetAllAsync()
        {
            return await base.GetAllAsync();
            // var ListOfFacilities = _context.Facilities.Select(F=>F);
            // return Task.FromResult(ListOfFacilities);
        }

        public async Task<Facility> HardDeleteAsync(Facility facility)
        {
            return await base.HardDeleteAsync(facility);
        //     var FacilityDeleted = await _context.Facilities.FirstOrDefaultAsync(F => F.NameEn == facility.NameEn);
        //     if (FacilityDeleted != null) 
        //     {
        //          _context.Facilities.Remove(FacilityDeleted);
        //         await _context.SaveChangesAsync();
        //     }
        //     else
        //     {
        //         return null;
        //     }
        //     return null;
        // }
    }

    public async Task<Facility> SoftDeleteAsync(Facility facility)
    {
        return await base.SoftDeleteAsync(facility);
    }
}