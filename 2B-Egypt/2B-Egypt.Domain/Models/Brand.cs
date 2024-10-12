namespace _2B_Egypt.Domain.Models;
public class Brand : BaseEntity
{
    [Required(ErrorMessage = " Arabic  name is required.")]
    [MaxLength(100, ErrorMessage = "Brand name cannot exceed 100 characters.")]
    public string NameAr { get; set; }
    [Required(ErrorMessage = " English  name is required.")]
    [MaxLength(100, ErrorMessage = "Brand name cannot exceed 100 characters.")]
    public string NameEn { get; set; }
    public string Email { get; set; }
    
    // Navigation Properities : 
    public virtual ICollection<Product>? Products { get; set; }
}