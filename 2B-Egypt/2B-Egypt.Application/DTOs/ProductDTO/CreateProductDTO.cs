namespace _2B_Egypt.Application.DTOs.ProductDTO;

public class CreateProductDTO
{
    public Guid? Id ;
    [Required, MinLength(3), MaxLength(100), Display(Name="Name (Arabic)")]
    public string NameAr { get; set; }

    [Required, MinLength(3), MaxLength(100), Display(Name = "Name (English)")]
    public string NameEn { get; set; }

    [Required, MinLength(10), MaxLength(150), Display(Name = "Description (Arabic)")]
    public string DescriptionAr { get; set; }
    
    [Required, MinLength(10), MaxLength(150), Display(Name = "Description (English)")]
    public string DescriptionEn { get; set; }

    [Required,MinLength(3),MaxLength(20), Display(Name = "Color (Arabic)")]
    public string ColorAr { get; set; }

    [Required, MinLength(3), MaxLength(20), Display(Name = "Color (English)")]
    public string ColorEn { get; set; }

    [Required,Range(0,double.MaxValue)]
    public decimal Price { get; set; }

    [Required, Range(0,int.MaxValue)]
    public int UnitInStock { get; set; }
    
    [Required, Range(0,100)]
    public int Discount { get; set; }
    [Required, Display(Name = "Category")]
    public Guid CategoryId { get; set; }
    [Required, Display(Name = "Brand")]
    public Guid BrandId { get; set; }
    //[Required,MinLength(1)]
    public virtual List<CreateImageWithPraductDTO> Images { get; set; } = [];
    public virtual List<CreateFacilityDTO> Facilities { get; set; } = [];
}
