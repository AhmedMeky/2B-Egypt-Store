namespace _2B_Egypt.Application.DTOs.OrderItemDTOs;

public class CreateOrderItemDTO
{
    [Required]
    public Guid ProductId { get; set; }

    [Required]
    public int Quantity { get; set; }

    [Required]
    public decimal ItemTotalPrice { get; set; }
}