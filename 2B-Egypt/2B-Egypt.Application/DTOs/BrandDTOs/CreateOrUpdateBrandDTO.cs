using System.ComponentModel.DataAnnotations;

namespace _2B_Egypt.Application.DTOs.BrandDTOs;
public class CreateOrUpdateBrandDTO
{
    public Guid Id { get; set; }
    public DateTime CreatedAt { get; set; }
    [Required,MinLength(3),MaxLength(20)]
    public string NameAr { get; set; }
    [Required, MinLength(3), MaxLength(20)]
    public string NameEn { get; set; }
    [Required, MinLength(7), MaxLength(20)]
    public string Email { get; set; }

}
