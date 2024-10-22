namespace _2B_Egypt.Application.DTOs.Shared;
public class ReviewForGetAllProductDTO 
{
    public string NickName { get; set; }

    public string Summary { get; set; }
    public string ReviewText { get; set; }

    public decimal QualityRating { get; set; }
    public decimal ValueRating { get; set; }
    public decimal PriceRating { get; set; }
}
