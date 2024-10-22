namespace _2B_Egypt.Application.DTOs.AdminDTOs;

public class CreateAdminDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Compare("Password"), DataType(DataType.Password), Display(Name = "Confirm Password")]
    public string ConfirmPassword { get; set; }
}
