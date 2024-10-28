namespace _2B_Egypt.Application.DTOs.UserDTOs;

public class CreateUserDTO
{
    [Required,MaxLength(20)]
    public string FirstName { get; set; }

    [Required, MaxLength(20)]
    public string LastName { get; set; }

    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [Required, DataType(DataType.PhoneNumber)]
    public virtual string? PhoneNumber { get; set; }

    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Compare("Password"), DataType(DataType.Password), Display(Name = "Confirm Password")]
    public string ConfirmPassword { get; set; }
}

