namespace _2B_Egypt.Application.Services;

public class CategoryService : ICategoryService
{

    private readonly ICategoryRepository categoryRepository;
    private readonly IMapper mapper;

    public CategoryService(ICategoryRepository categoryRepository, IMapper mapper)
    {
        this.categoryRepository = categoryRepository;
        this.mapper = mapper;
    }

    public async Task<ResponseDTO<CreateCategoryDTO>> CreateAsync(CreateCategoryDTO _category)
    {
        bool exists = (await categoryRepository.CategoryNameExists(_category.NameEn) || await categoryRepository.CategoryNameExists(_category.NameAr));
        if (exists)
        {
            return new ResponseDTO<CreateCategoryDTO> { Entity = null, IsSuccessfull = false, Message = "Category Already Exist" };

        }
        else
        {
            _category.Id = Guid.NewGuid();
            Category category = mapper.Map<Category>(_category);
            category.CreatedAt = DateTime.Now;
            var categoryAdded = await categoryRepository.CreateAsync(category);
            await categoryRepository.SaveChangesAsync();
            var categoryDTO = mapper.Map<CreateCategoryDTO>(categoryAdded);
            return new ResponseDTO<CreateCategoryDTO>()
            {
                Entity = categoryDTO,
                IsSuccessfull = true,
                Message = "Category Added Successfully"
            };
        }
    }


    public async Task<ResponseDTO<CreateCategoryDTO>> GetByIdAsync(Guid id)
    {
        var category = await categoryRepository.GetByIdAsync(id);
        if (category is null)
        {
            return new()
            {
                Entity = null,

                IsSuccessfull = false,
                Message = "There is no category with this id"
            };
        }
        return new()
        {
            Entity = mapper.Map<CreateCategoryDTO>(category),
            IsSuccessfull = true,
            Message = "category found successfully"
        };
    }


    public async Task<ResponseDTO<List<CreateCategoryDTO>>> GetAllAsync()
    {
        var categories = await categoryRepository.GetAllAsync();
        return new ResponseDTO<List<CreateCategoryDTO>>()
        {
            Entity = mapper.Map<List<CreateCategoryDTO>>(categories.ToList()),
            IsSuccessfull = true,
            Message = "OK"
        };
    }

    public async Task<ResponseDTO<CreateCategoryDTO>> UpdateAsync(CreateCategoryDTO categoryDTO)
    {
        ResponseDTO<CreateCategoryDTO> result;
        try
        {
            var oldCategory = await categoryRepository.GetByIdAsync(categoryDTO.Id);
            if (oldCategory == null)
            {
                result = new ResponseDTO<CreateCategoryDTO>
                {
                    Entity = null,
                    IsSuccessfull = false,
                    Message = "Category not found."
                };
                return result;
            }

            bool exists = (await categoryRepository.GetAllAsync())
                .Any(b => (b.NameEn == categoryDTO.NameEn || b.NameAr == categoryDTO.NameAr) && b.Id != categoryDTO.Id);

            if (exists)
            {
                result = new ResponseDTO<CreateCategoryDTO>
                {
                    Entity = null,
                    IsSuccessfull = false,
                    Message = "A Category with the same name already exists."
                };
                return result;
            }
            mapper.Map(categoryDTO, oldCategory);
            oldCategory.UpdatedAt = DateTime.Now;
            var updatedCategory = await categoryRepository.UpdateAsync(oldCategory);
            await categoryRepository.SaveChangesAsync();

            var returnCategory = mapper.Map<CreateCategoryDTO>(updatedCategory);
            result = new ResponseDTO<CreateCategoryDTO>
            {
                Entity = returnCategory,
                IsSuccessfull = true,
                Message = "Category updated successfully."
            };

            return result;
        }
        catch (Exception ex)
        {
            result = new ResponseDTO<CreateCategoryDTO>
            {
                Entity = null,
                IsSuccessfull = false,
                Message = "Error occurred: " + ex.Message
            };
            return result;
        }
    }

    public async Task SoftDeleteAsync(Guid id)
    {
        var category = await categoryRepository.GetByIdAsync(id);
        if (category != null)
        {
            category.IsDeleted = true;
            category.DeletedAt = DateTime.Now;
            await categoryRepository.UpdateAsync(category);
            await categoryRepository.SaveChangesAsync();
        }
    }

    public async Task HardDeleteAsync(Guid id)
    {
        var category = await categoryRepository.GetByIdAsync(id);
        if (category != null)
        {
            await categoryRepository.HardDeleteAsync(category);
            await categoryRepository.SaveChangesAsync();
        }
    }


    //public async Task<ResponseDTO<CreateCategoryDTO>> DeleteAsync(CreateCategoryDTO categoryDTO)
    //{

    //    bool Exists = (await categoryRepository.CategoryNameExists(categoryDTO.NameAr) || await categoryRepository.CategoryNameExists(categoryDTO.NameEn));
    //    if (Exists)
    //    {
    //        Category MappedCategory = mapper.Map<Category>(categoryDTO);
    //        await categoryRepository.SoftDeleteAsync(MappedCategory);
    //        await categoryRepository.SaveChangesAsync();
    //        return new ResponseDTO<CreateCategoryDTO>() { Entity = categoryDTO, IsSuccessfull = true, Message = "Category deleted Succ" };
    //    }
    //    else
    //    {
    //        return new ResponseDTO<CreateCategoryDTO>() { Entity = null, IsSuccessfull = false, Message = "Category Not Exists" };
    //    }
    //}


    //public async Task<ResponseDTO<CategoryWithRelatedProducts>> GetByIdAsync(string categoryGUID)
    //{

    //    Guid categoryId = Guid.Parse(categoryGUID);
    //    Category category = await categoryRepository.GetByIdAsync(categoryId, new[] { "Products" });
    //    var CatwithProducts = mapper.Map<CategoryWithRelatedProducts>(category);
    //    if (category != null)
    //    {
    //        return new ResponseDTO<CategoryWithRelatedProducts>()
    //        { Entity = CatwithProducts, IsSuccessfull = true, Message = "Category With Products" };
    //    }
    //    else
    //    {
    //        return new ResponseDTO<CategoryWithRelatedProducts>()
    //        { Entity = null, IsSuccessfull = false, Message = "category not exists" };
    //    }
    //}


    //public async Task<ResponseDTO<CreateCategoryDTO>> GetMyParentCategoryAsync(string categoryGUID)
    //{
    //    Guid CId = Guid.Parse(categoryGUID);
    //    var category = await categoryRepository.GetByIdAsync(CId);
    //    var categoryDTO = mapper.Map<CreateCategoryDTO>(category);
    //    if (category == null)
    //    {
    //        return new ResponseDTO<CreateCategoryDTO>()
    //        {
    //            Entity = null,
    //            IsSuccessfull = false,
    //            Message = "Category not Exists"
    //        };
    //    }
    //    else
    //    {
    //        var parentCatID = category.ParentCategoryId;
    //        if (parentCatID == Guid.Empty)
    //        {
    //            return new ResponseDTO<CreateCategoryDTO>()
    //            {
    //                Entity = categoryDTO,
    //                IsSuccessfull = true,
    //                Message = "this Category Has no Parent Category"
    //            };
    //        }
    //        else
    //        {
    //            var parentCategory = await categoryRepository.GetByIdAsync((Guid)parentCatID);
    //            if (parentCategory == null)
    //            {
    //                return new ResponseDTO<CreateCategoryDTO>()
    //                {
    //                    Entity = categoryDTO,
    //                    IsSuccessfull = true,
    //                    Message = "Parent category not found"
    //                };
    //            }
    //            else
    //            {
    //                var parentCategoryDTO = mapper.Map<CreateCategoryDTO>(parentCategory);
    //                return new ResponseDTO<CreateCategoryDTO>()
    //                {
    //                    Entity = parentCategoryDTO,
    //                    IsSuccessfull = true,
    //                    Message = "Parent category retrieved successfully"
    //                };
    //            }
    //        }
    //    }
    //}


    //public async Task<ResponseDTO<CreateCategoryDTO>> SearchByName(string categoryName)
    //{
    //    bool ok = (await categoryRepository.CategoryNameExists(categoryName) || await categoryRepository.CategoryNameExists(categoryName));
    //    if (ok)
    //    {

    //        return new ResponseDTO<CreateCategoryDTO>
    //        {
    //            Entity = new CreateCategoryDTO()
    //            {
    //                NameAr = categoryName,
    //                NameEn = categoryName
    //            },
    //            IsSuccessfull = true,
    //            Message = "Category Already Exist"
    //        };
    //    }
    //    return new ResponseDTO<CreateCategoryDTO>
    //    {
    //        Entity = null,
    //        IsSuccessfull = false,
    //        Message = "Category Not Exist"
    //    };
    //}


    //public async Task<ResponseDTO<IEnumerable<SubCategoryDTO>>> GetAllSubCategories(Guid ParentCatID)
    //{
    //    if (ParentCatID == Guid.Empty)
    //    {
    //        return new ResponseDTO<IEnumerable<SubCategoryDTO>>() { Entity = null, IsSuccessfull = false, Message = "Category ID invalid" };
    //    }
    //    else
    //    {
    //        var ListOfSubCategories = (await categoryRepository.GetAllSubCategories(ParentCatID)).ToList();
    //        if (ListOfSubCategories.Count() == 0)
    //        {
    //            return new ResponseDTO<IEnumerable<SubCategoryDTO>>() { Entity = null, IsSuccessfull = false, Message = "no sub categories....... " };
    //        }
    //        return new ResponseDTO<IEnumerable<SubCategoryDTO>>()
    //        { Entity = (IEnumerable<SubCategoryDTO>)ListOfSubCategories,
    //            IsSuccessfull = true,
    //            Message = "Sub categories retrieved successfully"
    //        };

    //    }
    //}

    //public async Task<ResponseDTO<IEnumerable<CreateProductDTO>>> GetAllRelatedProducts(string ParentCatID)
    //{
    //    return null;
    //}


    //public Task<ResponseDTO<UpdateCategoryDTO>> UpdateAsync(UpdateCategoryDTO category)
    //{
    //    throw new NotImplementedException();
    //}


    //public Task<ResponseDTO<SubCategoryDTO>> GetAllSubCategories(string ParentCatID)
    //{
    //    throw new NotImplementedException();
    //}

    //public Task<bool> IsExists(string categoryName)
    //{
    //    throw new NotImplementedException();
    //}

    //public Task<ResponseDTO<IQueryable<CategoryWithRelatedProducts>>> GetAllWithRelatedProductsAsync()
    //{
    //    throw new NotImplementedException();
    //}


}
