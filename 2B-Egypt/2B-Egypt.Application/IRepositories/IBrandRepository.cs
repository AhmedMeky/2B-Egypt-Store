using Microsoft.EntityFrameworkCore;

namespace _2B_Egypt.Application.IRepositories
{
    public interface IBrandRepository : IGenericRepository<Brand,Guid>
    {
        public Task<bool> BrandNameExists(string name);
    }
}