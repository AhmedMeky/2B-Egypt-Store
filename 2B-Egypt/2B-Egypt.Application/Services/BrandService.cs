

namespace _2B_Egypt.Application.Services
{
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _brandRepository;
        private readonly IMapper _mapper;
        public BrandService(IBrandRepository brandRepository, IMapper mapper)
        {
            _brandRepository = brandRepository;
            _mapper = mapper;
        }

        public async Task<ResponseDTO<CreateOrUpdateBrandDTO>> CreateAsync(CreateOrUpdateBrandDTO brand)
        {
            ResponseDTO<CreateOrUpdateBrandDTO> result = new ResponseDTO<CreateOrUpdateBrandDTO>();

            try
            {
                bool exists = (await _brandRepository.GetAllAsync()).Any(b => b.NameEn == brand.NameEn || b.NameAr == brand.NameAr);
                if (exists)
                {
                    result = new ResponseDTO<CreateOrUpdateBrandDTO>
                    {
                        Entity = null,
                        IsSuccessfull = false,
                        Message = "Brand already exists with the same name."
                    };
                    return result;
                }

                var newBrand = _mapper.Map<Brand>(brand);
                newBrand.Id = Guid.NewGuid();
                newBrand.CreatedAt = DateTime.Now;
                await _brandRepository.CreateAsync(newBrand);
                await _brandRepository.SaveChangesAsync();

                var returnBrand = _mapper.Map<CreateOrUpdateBrandDTO>(newBrand);
                result = new ResponseDTO<CreateOrUpdateBrandDTO>
                {
                    Entity = returnBrand,
                    IsSuccessfull = true,
                    Message = "Brand created successfully."
                };

                return result;
            }
            catch (Exception ex)
            {
                result = new ResponseDTO<CreateOrUpdateBrandDTO>
                {
                    Entity = null,
                    IsSuccessfull = false,
                    Message = "Error occurred: " + ex.Message
                };
                return result;
            }
        }

        public async Task DeleteAsync(Guid id)
        {
            var brand = await _brandRepository.GetByIdAsync(id);
            if (brand != null)
            {
                await _brandRepository.HardDeleteAsync(brand);
                await _brandRepository.SaveChangesAsync();
            }
        }

        public async Task<List<CreateOrUpdateBrandDTO>> GetAllAsync()
        {
            var brands = await _brandRepository.GetAllAsync();
            return _mapper.Map<List<CreateOrUpdateBrandDTO>>(brands.ToList());
        }

        public async Task<EntitypaginatedDTO<CreateOrUpdateBrandDTO>> GetAllPaginatedAsync(int pageNumber, int pageSize)
        {
            var allBrands = await _brandRepository.GetAllAsync();
            var paginatedBrands = allBrands.Skip((pageNumber - 1) * pageSize).Take(pageSize);
            var brandList = _mapper.Map<List<CreateOrUpdateBrandDTO>>(paginatedBrands.ToList());
            var totalCount = allBrands.Count();

            var result = new EntitypaginatedDTO<CreateOrUpdateBrandDTO>
            {
                Data = brandList,
                Count = totalCount
            };

            return result;
        }

        public async Task<List<CreateOrUpdateBrandDTO>> SearchByNameAsync(string brandName)
        {
            var brands = await _brandRepository.SearchByNameAsync(brandName);
            return _mapper.Map<List<CreateOrUpdateBrandDTO>>(brands);
        }

        public async Task<ResponseDTO<CreateOrUpdateBrandDTO>> UpdateAsync(CreateOrUpdateBrandDTO brand)
        {
            ResponseDTO<CreateOrUpdateBrandDTO> result = new ResponseDTO<CreateOrUpdateBrandDTO>();

            try
            {
                var oldBrand = await _brandRepository.GetByIdAsync(brand.Id);
                if (oldBrand == null)
                {
                    result = new ResponseDTO<CreateOrUpdateBrandDTO>
                    {
                        Entity = null,
                        IsSuccessfull = false,
                        Message = "Brand not found."
                    };
                    return result;
                }

                bool exists = (await _brandRepository.GetAllAsync())
                    .Any(b => (b.NameEn == brand.NameEn || b.NameAr == brand.NameAr) && b.Id != brand.Id);

                if (exists)
                {
                    result = new ResponseDTO<CreateOrUpdateBrandDTO>
                    {
                        Entity = null,
                        IsSuccessfull = false,
                        Message = "A brand with the same name already exists."
                    };
                    return result;
                }
                _mapper.Map(brand, oldBrand);
                oldBrand.UpdatedAt = DateTime.Now;
                var updatedBrand = await _brandRepository.UpdateAsync(oldBrand);
                await _brandRepository.SaveChangesAsync();

                var returnBrand = _mapper.Map<CreateOrUpdateBrandDTO>(updatedBrand);
                result = new ResponseDTO<CreateOrUpdateBrandDTO>
                {
                    Entity = returnBrand,
                    IsSuccessfull = true,
                    Message = "Brand updated successfully."
                };

                return result;
            }
            catch (Exception ex)
            {
                result = new ResponseDTO<CreateOrUpdateBrandDTO>
                {
                    Entity = null,
                    IsSuccessfull = false,
                    Message = "Error occurred: " + ex.Message
                };
                return result;
            }
        }
        public async Task<ResponseDTO<CreateOrUpdateBrandDTO>> GetByIdAsync(Guid id)
        {
            var brand = await _brandRepository.GetByIdAsync(id);
            if (brand is null)
            {
                return new ResponseDTO<CreateOrUpdateBrandDTO>
                {
                    IsSuccessfull = false,
                    Message = "There is no Brand with this Id"
                };
            }
            var response = new ResponseDTO<CreateOrUpdateBrandDTO>
            {
                Entity = _mapper.Map<CreateOrUpdateBrandDTO>(brand),
                IsSuccessfull = true,
            };
            return response;
        }
        public async Task SoftDeleteAsync(Guid id)
        {
            var brand = await _brandRepository.GetByIdAsync(id);
            if (brand != null)
            {
                brand.IsDeleted = true;
                brand.DeletedAt = DateTime.Now;
                await _brandRepository.UpdateAsync(brand);
                await _brandRepository.SaveChangesAsync();
            }
        }

        public async Task HardDeleteAsync(Guid id)
        {
            var brand = await _brandRepository.GetByIdAsync(id);
            if (brand != null)
            {
                await _brandRepository.HardDeleteAsync(brand);
                await _brandRepository.SaveChangesAsync();
            }
        }


    }
}

