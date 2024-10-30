namespace _2B_Egypt.Application.DTOs.UserDTOs;
public class GetAllUserDTO
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public string Rule { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string PhoneNumber { get; set; }
    public string? AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
}