namespace _2B_Egypt.Application.DTOs.OrderDTOs;
public class GetAllOrderDTO
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public OrderStatusAr Status_Er { get; set; }
    public OrderStatusEn Status_En { get; set; }
    public decimal TotalAmount { get; set; }
    public int OrderNumber { get; set; }
    public DateTime CreatedAt { get; set; }
    public Guid PaymentId { get; set; }
    public virtual Payment Payment { get; set; }
    public virtual GetAllUserDTO User { get; set; }
    // public virtual ICollection<OrderItem> OrderItems { get; set; }
}