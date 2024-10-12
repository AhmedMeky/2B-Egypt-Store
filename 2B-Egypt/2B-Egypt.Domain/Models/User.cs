namespace _2B_Egypt.Domain.Models;
public class User : IdentityUser<Guid>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public int ResetCode { get; set; }

    // Navigation Properities : 
    public virtual ICollection<Order>? Orders { get; set; }
    public virtual ICollection<Payment>? Payments { get; set; }
}