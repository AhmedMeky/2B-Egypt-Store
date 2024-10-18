using System.ComponentModel.DataAnnotations;

namespace _2B_Egypt.AdminDashboard.ViewModels;
public class UserVM
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }

    [DataType(DataType.Password)]
    public string Password { get; set; }

    [Compare("Password"), DataType(DataType.Password), Display(Name = "Confirm Password")]
    public string ConfirmPassword { get; set; }
}
