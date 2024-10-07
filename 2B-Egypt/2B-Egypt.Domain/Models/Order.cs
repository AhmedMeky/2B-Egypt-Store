namespace _2B_Egypt.Domain.Models;
public class Order : BaseEntity
{
    [Required]
    public Guid UserId { get; set; }
    public OrderStatusAr Status_Er { get; set; }
    public OrderStatusEn Status_En { get; set; }
    [Required]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal TotalAmount { get; set; }
    public int OrderNumber { get; set; }
    public Guid PaymentId { get; set; }
    [ForeignKey("PaymentId")]
    public virtual Payment Payment { get; set; }

    public virtual User User { get; set; }
    public virtual ICollection<OrderItem> OrderItems { get; set; }
}