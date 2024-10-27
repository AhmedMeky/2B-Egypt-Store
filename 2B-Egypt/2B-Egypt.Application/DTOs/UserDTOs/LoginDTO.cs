namespace _2B_Egypt.Application.DTOs.UserDTOs;

public class LoginDTO
{
    [Required,DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [Required,DataType(DataType.Password)]
    public string Password { get; set; }
}
