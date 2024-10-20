using System.ComponentModel.DataAnnotations;

namespace _2B_Egypt.AdminDashboard.ViewModels;
public class LoginDTO
{
    [Required, DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [Required, DataType(DataType.Password)]
    public string Password { get; set; }
    public bool RememberMe { get; set; } = false;
}
