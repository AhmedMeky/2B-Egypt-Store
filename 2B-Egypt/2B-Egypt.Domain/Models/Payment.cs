namespace _2B_Egypt.Domain.Models;
public class Payment : BaseEntity
{
    public string TransactionId { get; set; }
    public string PaymentType { get; set; }
    public decimal OrderPrice { get; set; }
    public Guid UserId { get; set; }
    public Guid OrderId { get; set; }


    // Navigation Properities
    [ForeignKey("UserId")]
    public virtual User User { get; set; }
    [Required(ErrorMessage = "Order Id  status is required")]
    [ForeignKey("OrderId")]
    public virtual Order Order { get; set; }
}