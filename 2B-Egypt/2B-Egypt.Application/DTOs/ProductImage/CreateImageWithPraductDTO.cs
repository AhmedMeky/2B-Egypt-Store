using System.ComponentModel.DataAnnotations;

namespace _2B_Egypt.Application.DTOs.ProductImageDTO;

public class CreateImageWithPraductDTO
{
    [Required]
    public string ImageUrl { get; set; }
}
