using _2B_Egypt.Application.DTOs;

namespace _2B_Egypt.Infrastructure.Reposetories
{
    public class CategoryRepository : GenericRepository<Category, Guid> , ICategoryRepository
    {
        private readonly AppDbContext _context;

        public CategoryRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }  
        public async Task<bool> CategoryNameExists(string Categoryname)
        { 
           
         return (await GetAllAsync().Result.AnyAsync(category => category.NameEn == Categoryname || category.NameAr == Categoryname));
        }  
        public async Task<IEnumerable<Category>>GetAllSubCategories(Guid CatId)
        {
            return _context.Categories.Where(c => c.ParentCategoryId == CatId).Select(c => c).ToList();
        } 
        public   Task<IEnumerable<ProductDTO>> GetAllRelatedProduct(Guid CategoryId)
        {
           var ProductDTOs =   _context.Products.Where(p => p.CategoryId == CategoryId).Select(p => new ProductDTO()
            {
                Id = p.Id,
                NameAr = p.NameAr,
                NameEn = p.NameEn,
                ColorAr = p.ColorAr,
                ColorEn = p.ColorEn,
                DescriptionAr = p.DescriptionAr,
                DescriptionEn = p.DescriptionEn,
                Discount = p.Discount,
                Price = p.Price,
                UnitInStock = p.UnitInStock
            }).ToList();
            return null;
            
        }
        

    }
}