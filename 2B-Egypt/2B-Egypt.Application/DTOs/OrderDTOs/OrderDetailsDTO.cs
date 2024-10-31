namespace _2B_Egypt.Application.DTOs.OrderDTOs;

public class OrderDetailsDTO
{
    public int OrderNumber { get; set; }
    public DateTime? CreatedAt { get; set; }
    public OrderStatusAr Status_Er { get; set; }
    public OrderStatusEn Status_En { get; set; }
    public decimal Discount { get; set; }
    public decimal TotalAmount { get; set; }
    public List<OrderItemDetailsDTO> OrderItems { get; set; } = [];
}
