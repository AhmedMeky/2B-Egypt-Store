namespace _2B_Egypt.Application.IRepositories
{
    public interface ICategoryRepository : IGenericRepository<Category, Guid>
    {
        public Task<bool> CategoryNameExists(string Categoryname);
        public Task<IEnumerable<Category>> GetAllSubCategories(Guid CatId); 
        public Task<List<Category>> GetAllParentAsync();

    }



}