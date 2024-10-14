namespace _2B_Egypt.Application.DTOs.ProductDTO;

public class GetAllProductDTO
{
    [Required]
    public Guid Id { get; set; }
    public string NameAr { get; set; }

    public string NameEn { get; set; }

    public string DescriptionAr { get; set; }

    public string DescriptionEn { get; set; }

    public string ColorAr { get; set; }

    public string ColorEn { get; set; }

    public decimal Price { get; set; }

    public int UnitInStock { get; set; }

    public int Discount { get; set; }

    public CategoryForGetAllProductDTO Category { get; set; }

    public BrandForGetAllProductDTO Brand { get; set; }

    public virtual List<CreateImageWithPraductDTO> Images { get; set; } = [];
    //public virtual List<Guid> Facilities { get; set; } = [];
}

