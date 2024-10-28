namespace _2B_Egypt.Application.DTOs.UserDTOs;
public class AddressDTO
{
    [Required,MaxLength(45),MinLength(15)]
    public string AddressLine1 { get; set; }

    [Required, MaxLength(45), MinLength(15)]
    public string AddressLine2 { get; set; }

    [Required, MaxLength(20), MinLength(3)]
    public string City { get; set; }

    [Required, MaxLength(20), MinLength(3)]
    public string Country { get; set; }
}