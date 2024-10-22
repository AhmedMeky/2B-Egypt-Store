
namespace _2B_Egypt.Application.Services;

public class ReviewService : IReviewService
{
    private readonly IReviewRepository _reviewRepository;
    private readonly IMapper _mapper;

    public ReviewService(IReviewRepository reviewRepository, IMapper mapper)
    {
        _reviewRepository = reviewRepository;
        _mapper = mapper;
    }

    public async Task<ResponseDTO<GetReviewDTO>> CreateAsync(CreateOrUpdateReviewDTO reviewDTO)
    {
        if(reviewDTO == null)
        {
            return new()
            {
                Entity = null,
                IsSuccessfull = false,
                Message = "the reviw is null"
            };
        }
        Review review = _mapper.Map<Review>(reviewDTO);
        review.Id = Guid.NewGuid();
        review.CreatedAt = DateTime.Now;
        var createdReview = await _reviewRepository.CreateAsync(review);
        await _reviewRepository.SaveChangesAsync();
        return new()
        {
            Entity = _mapper.Map<GetReviewDTO>(createdReview),
            IsSuccessfull = true,
            Message = "review created successfullt"
        };
    }

    public async Task<ResponseDTO<List<GetReviewDTO>>> GetAllAsync(Guid productId)
    {
        var reviews = (await _reviewRepository.GetAllAsync()).Where(rev => rev.ProductId.Equals(productId)).ToList();
        return new()
        {
            Entity = _mapper.Map<List<GetReviewDTO>>(reviews),
            IsSuccessfull = true
        };
    }

    public async Task<ResponseDTO<GetReviewDTO>> GetByIdAsync(Guid id)
    {
        var review = await _reviewRepository.GetByIdAsync(id);
        if(review == null)
        {
            return new()
            {
                Entity = null,
                IsSuccessfull = false,
                Message = "there is no review with this Id"
            };
        }
        return new()
        {
            Entity = _mapper.Map<GetReviewDTO>(review),
            IsSuccessfull = true
        };
    }

    public async Task HardDeleteAsync(Guid id)
    {
        var review = await _reviewRepository.GetByIdAsync(id);
        if (review != null)
        {
            await _reviewRepository.HardDeleteAsync(review);
            await _reviewRepository.SaveChangesAsync();
        }
    }

    public async Task SoftDeleteAsync(Guid id)
    {
        var review = await _reviewRepository.GetByIdAsync(id);
        if (review != null)
        {
            review.IsDeleted = true;
            review.DeletedAt = DateTime.Now;
            await _reviewRepository.UpdateAsync(review);
            await _reviewRepository.SaveChangesAsync();
        }
    }

    public async Task<ResponseDTO<GetReviewDTO>> UpdateAsync(CreateOrUpdateReviewDTO reviewDTO, Guid reviewId)
    {
        var review = await _reviewRepository.GetByIdAsync(reviewId);
        if (review is null)
        {
            return new()
            {
                Entity = null,
                IsSuccessfull = false,
                Message = "there is no review with this Id"
            };
        }
        review = _mapper.Map<Review>(reviewDTO);
        await _reviewRepository.UpdateAsync(review);
        await _reviewRepository.SaveChangesAsync();
        return new()
        {
            Entity = _mapper.Map<GetReviewDTO>(review),
            IsSuccessfull = true,
            Message = "Updated Successfully"
        };
    }
}
