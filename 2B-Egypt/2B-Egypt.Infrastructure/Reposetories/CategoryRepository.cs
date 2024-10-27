using _2B_Egypt.Application.DTOs;
using _2B_Egypt.Application.DTOs.ProductDTO;

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
        //public async Task<IEnumerable<Category>> GetAllSubCategories(Guid CatId)
        //{
        //    return _context.Categories.Where(c => c.ParentCategoryId == CatId).Include(c => c.SubCategories).Select(c => c).ToList();

        //}
        public async Task<IEnumerable<Category>> GetAllSubCategories(Guid CatId)
        {
            var categories = new List<Category>();
            await GetSubCategoriesRecursive(CatId, categories);
            return categories;
        }

        private async Task GetSubCategoriesRecursive(Guid CatId, List<Category> categories)
        {
            
            var subCategories = await _context.Categories
                .Where(c => c.ParentCategoryId == CatId)
                .Include(c => c.SubCategories) 
                .ToListAsync();

           
            categories.AddRange(subCategories);

            
            foreach (var subCategory in subCategories)
            {
                await GetSubCategoriesRecursive(subCategory.Id, categories);
            }
        }

        public   Task<IEnumerable<CreateProductDTO>> GetAllRelatedProduct(Guid CategoryId)
        {
           var ProductDTOs =   _context.Products.Where(p => p.CategoryId == CategoryId).Select(p => new CreateProductDTO()
            {
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
         public async Task<List<Category>> GetAllParentAsync()
        {
            var response =   _context.Categories
                .Where(c => c.ParentCategoryId == null && c.IsDeleted==false)
                .Select(c => c)
                .ToList();
            if(response.Count() == 0)
            {
                return null;
            } 
            else
            {
                return response;
            }
        }


    }
}