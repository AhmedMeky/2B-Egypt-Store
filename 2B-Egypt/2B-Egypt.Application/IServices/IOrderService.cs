namespace _2B_Egypt.Application.IServices;

public interface IOrderService
{
    Task<ResponseDTO<CreateOrderDTO>> CreateAsync(CreateOrderDTO orderDTO);
}