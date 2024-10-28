namespace _2B_Egypt.Application.Services;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _OrderRepository;
    private readonly IMapper _mapper;

    public OrderService(IOrderRepository orderRepository, IMapper mapper)
    {
        _OrderRepository = orderRepository;
        _mapper = mapper;
    }

    public async Task<ResponseDTO<CreateOrderDTO>> CreateAsync(CreateOrderDTO orderDTO)
    {
        if (orderDTO is null)
        {
            return new ResponseDTO<CreateOrderDTO>() { Entity = null, IsSuccessfull = false, Message = "Not Valid Values" };
        }
        var order = _mapper.Map<Order>(orderDTO);
        order.Id = Guid.NewGuid();
        order.CreatedAt = DateTime.Now;
        order.Status_En = OrderStatusEn.Pending;
        order.Status_Er = OrderStatusAr.في_الانتظار;
        order.Payment = new Payment()
        {
            Id = Guid.NewGuid(),
            CreatedAt = DateTime.Now,
            OrderPrice = orderDTO.TotalAmount,
            TransactionId = orderDTO.TransactionId,
            PaymentType = orderDTO.PaymentType,
            UserId = orderDTO.UserId
        };
        order.OrderItems = [];
        foreach (var item in orderDTO.OrderItems)
        {
            var orderItem = _mapper.Map<OrderItem>(item);
            orderItem.Id = Guid.NewGuid();
            orderItem.CreatedAt = DateTime.Now;
            order.OrderItems.Add(orderItem);
        }
        var result = await _OrderRepository.CreateAsync(order);
        await _OrderRepository.SaveChangesAsync();

        return new ResponseDTO<CreateOrderDTO>()
        {
            Entity = _mapper.Map<CreateOrderDTO>(result),
            IsSuccessfull = true,
        };
    }
}