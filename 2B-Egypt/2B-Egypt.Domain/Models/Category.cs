namespace _2B_Egypt.Domain.Models;

public class Category : BaseEntity
{
    [Required(ErrorMessage = " Arabic  name is required.")]
    [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
    public string NameAr { get; set; }
    [Required(ErrorMessage = " English  name is required.")]
    [MaxLength(100, ErrorMessage = "Category name cannot exceed 100 characters.")]
    public string NameEn { get; set; }

    [ForeignKey("ParentCategory")]
    public Guid? ParentCategoryId { get; set; }

    // Navigation Properities : 
    public virtual Category? ParentCategory { get; set; }

    public virtual ICollection<Category>? SubCategories { get; set; }
    public virtual ICollection<Product>? Products { get; set; }
}