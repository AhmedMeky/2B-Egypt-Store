namespace _2B_Egypt.Domain.Models;
public class Cart : BaseEntity
{
    [Required(ErrorMessage = "Product Id is Required")]
    public Guid ProductId { get; set; }
    [Required(ErrorMessage = "Session Id is Required")]
    public Guid SessionId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be a positive number.")]
    public int Quantity { get; set; }

    // Navigation Properities
    [ForeignKey("ProductId")]
    public virtual Product Product { get; set; }
}