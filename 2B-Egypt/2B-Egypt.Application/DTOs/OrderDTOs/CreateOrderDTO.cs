
public class CreateOrderDTO
{
    [Required]
    public Guid UserId { get; set; }

    [Required]
    public decimal TotalAmount { get; set; }

    [Required]
    public string TransactionId { get; set; }

    [Required]
    public string PaymentType { get; set; }

    [Required,MinLength(1)]
    public List<CreateOrderItemDTO> OrderItems { get; set; }
}