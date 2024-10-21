namespace _2B_Egypt.Application.DTOs.ReviewDTOs;

public class GetReviewDTO
{
    public Guid Id { get; set; }
    public string NickName { get; set; }
    public string Summary { get; set; }
    public string ReviewText { get; set; }
    public decimal QualityRating { get; set; }
    public decimal ValueRating { get; set; }
    public decimal PriceRating { get; set; }
}
