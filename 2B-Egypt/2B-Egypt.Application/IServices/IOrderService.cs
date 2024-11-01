namespace _2B_Egypt.Application.IServices;

public interface IOrderService
{
    Task<ResponseDTO<CreateOrderDTO>> CreateAsync(CreateOrderDTO orderDTO);
    Task<ResponseDTO<List<GetAllOrderDTO>>> GetAllOrderAsync();
    Task<ResponseDTO<List<GetAllOrderDTO>>> GetAllOrderAsync(Guid userId);
    Task<ResponseDTO<OrderDetailsDTO>> GetOrderByIdAsync(Guid orderId);
    Task<ResponseDTO<Order>> GetOrderDetailsByIdAsync(Guid orderId);
}