namespace _2B_Egypt.Application.IServices;

public interface IReviewService
{
    Task<ResponseDTO<GetReviewDTO>> CreateAsync(CreateOrUpdateReviewDTO reviewDTO);
    Task<ResponseDTO<GetReviewDTO>> GetByIdAsync(Guid id);
    Task<ResponseDTO<List<GetReviewDTO>>> GetAllAsync(Guid ProductId);
    Task<ResponseDTO<GetReviewDTO>> UpdateAsync(CreateOrUpdateReviewDTO reviewDTO,Guid reviewId);
    Task SoftDeleteAsync(Guid id);
    Task HardDeleteAsync(Guid id);
}
