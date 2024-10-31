namespace _2B_Egypt.Application.DTOs.Shared;

public class OrderItemDetailsDTO
{
    public string NameAr { get; set; }
    public string NameEn { get; set; }
    public decimal Price { get; set; }
    public decimal Discount { get; set; }
    public int Quantity { get; set; }
    public decimal ItemTotalPrice { get; set; }
}
