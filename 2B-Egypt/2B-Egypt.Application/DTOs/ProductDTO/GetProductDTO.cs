namespace _2B_Egypt.Application.DTOs.ProductDTO;

public class GetProductDTO
{
    [Required]
    public Guid Id { get; set; }
    public string NameAr { get; set; }
    public string NameEn { get; set; }
    public int UnitInStock { get; set; }
    public decimal Price { get; set; }
    public int Discount { get; set; }
    public List<CreateImageWithPraductDTO> Images { get; set; }
}
