namespace _2B_Egypt.Domain.Models;
public class ProductImage : BaseEntity
{
    [Required]
    public Guid ProductId { get; set; }
    [Required]
    public string ImageUrl { get; set; }

    // Navigation Properities : 
    public virtual Product Product { get; set; }
}