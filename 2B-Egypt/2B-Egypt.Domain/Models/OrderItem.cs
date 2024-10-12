namespace _2B_Egypt.Domain.Models;
public class OrderItem : BaseEntity
{
    [Required(ErrorMessage = "ProductId is required")]
    public Guid ProductId { get; set; }
    public Guid OrderId { get; set; }

    [Required(ErrorMessage = "Quantity is required")]
    public int Quantity { get; set; }

    [Required(ErrorMessage = "Price is required")]
    [Column(TypeName = "decimal(18, 2)")]
    public decimal ItemTotalPrice { get; set; }

    // Novigation Properities : 
    [ForeignKey("ProductId")]
    public virtual Product Product { get; set; }
    [ForeignKey("OrderId")]
    public virtual Order Order { get; set; }
}