namespace _2B_Egypt.Application.DTOs.ReviewDTOs;

public class CreateOrUpdateReviewDTO
{
    public Guid Id { get; set; }
    [Required(ErrorMessage = "Nickname is required.")]
    [MaxLength(50, ErrorMessage = "Nickname cannot exceed 50 characters.")]
    public string NickName { get; set; }

    [Required(ErrorMessage = "Summary is required.")]
    [MaxLength(100, ErrorMessage = "Summary cannot exceed 100 characters.")]
    public string Summary { get; set; }

    [Required(ErrorMessage = "Review text is required.")]
    [MaxLength(1000, ErrorMessage = "Review text cannot exceed 1000 characters.")]
    public string ReviewText { get; set; }

    [Required(ErrorMessage = "Quality rating is required.")]
    [Range(0, 5, ErrorMessage = "Quality rating must be between 0 and 5.")]
    public decimal QualityRating { get; set; }

    [Required(ErrorMessage = "Value rating is required.")]
    [Range(0, 5, ErrorMessage = "Value rating must be between 0 and 5.")]
    public decimal ValueRating { get; set; }

    [Required(ErrorMessage = "Price rating is required.")]
    [Range(0, 5, ErrorMessage = "Price rating must be between 0 and 5.")]
    public decimal PriceRating { get; set; }
    public Guid ProductId { get; set; }
}
