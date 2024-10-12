namespace _2B_Egypt.Application.DTOs.BrandDTOs;
public class CreateBrandDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    public string NameAr { get; set; }
    public string NameEn { get; set; }
    public string Email { get; set; }

}
