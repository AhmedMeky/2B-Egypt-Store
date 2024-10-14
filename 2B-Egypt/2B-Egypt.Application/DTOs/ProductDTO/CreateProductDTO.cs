namespace _2B_Egypt.Application.DTOs.ProductDTO;

public class CreateProductDTO
{
  
    public Guid Id ;
    [Required, MinLength(3), MaxLength(45)]
    public string NameAr { get; set; }

    [Required, MinLength(3), MaxLength(45)]
    public string NameEn { get; set; }

    [Required, MinLength(10), MaxLength(150)]
    public string DescriptionAr { get; set; }

    [Required, MinLength(10), MaxLength(150)]
    public string DescriptionEn { get; set; }

    [Required,MinLength(3),MaxLength(20)]
    public string ColorAr { get; set; }

    [Required, MinLength(3), MaxLength(20)]
    public string ColorEn { get; set; }

    [Required,Range(0,double.MaxValue)]
    public decimal Price { get; set; }

    [Required, Range(0,int.MaxValue)]
    public int UnitInStock { get; set; }
    
    [Required, Range(0,100)]
    public int Discount { get; set; }

    public Guid CategoryId { get; set; }

    public Guid BrandId { get; set; }

    //[Required,MinLength(1)]
    public virtual List<CreateImageWithPraductDTO> Images { get; set; } = [];
    //public virtual List<Guid> Facilities { get; set; } = [];
}
