using _2B_Egypt.Domain.Models;
using Microsoft.EntityFrameworkCore;

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

    public async Task<ResponseDTO<List<GetAllOrderDTO>>> GetAllOrderAsync()
    {
        var orders = (await _OrderRepository.GetAllAsync())
                        .Include(ord => ord.User)
                        .Include(ord => ord.Payment)
                        .AsNoTracking();
        return new ResponseDTO<List<GetAllOrderDTO>>
        {
            Entity = _mapper.Map<List<GetAllOrderDTO>>(orders.ToList()),
            IsSuccessfull = true 
        };
    }

    public async Task<ResponseDTO<List<GetAllOrderDTO>>> GetAllOrderAsync(Guid  userId)
    {
        var orders = (await _OrderRepository.GetAllAsync())
                        .Include(ord => ord.User)
                        .Include(ord => ord.Payment)
                        .Where(ord => ord.User.Id.Equals(userId))
                        .AsNoTracking();
        return new ResponseDTO<List<GetAllOrderDTO>>
        {
            Entity = _mapper.Map<List<GetAllOrderDTO>>(orders.ToList()),
            IsSuccessfull = true
        };
    }

    public async Task<ResponseDTO<OrderDetailsDTO>> GetOrderByIdAsync(Guid orderId)
    {
        var order = await _OrderRepository.GetByIdAsync(orderId, ["Payment", "OrderItems.Product"]);
        OrderDetailsDTO orderDetails = new()
        {
            OrderNumber = order.OrderNumber,
            CreatedAt = order.CreatedAt,
            Status_En = order.Status_En,
            Status_Er = order.Status_Er
        };
        orderDetails.OrderItems = order.OrderItems
            .Select(orditem => new OrderItemDetailsDTO() 
                                    { 
                                        ItemTotalPrice = orditem.Quantity * orditem.Product.Price - (orditem.Quantity * orditem.Product.Price * orditem.Product.Discount / 100m),
                                        NameAr = orditem.Product.NameAr,
                                        NameEn = orditem.Product.NameEn,
                                        Discount = orditem.Quantity * orditem.Product.Price * orditem.Product.Discount /100m,
                                        Price = orditem.Product.Price,
                                        Quantity = orditem.Quantity,
                                    }).ToList();

        orderDetails.Discount = orderDetails.OrderItems.Sum(item => item.Discount);
        orderDetails.TotalAmount = orderDetails.OrderItems.Sum(item => item.ItemTotalPrice);
        return new ResponseDTO<OrderDetailsDTO>() { Entity = orderDetails, IsSuccessfull = true};
    }

    public async Task<ResponseDTO<Order>> GetOrderDetailsByIdAsync(Guid orderId)
    {
        var order = await _OrderRepository.GetByIdAsync(orderId, ["Payment","User","OrderItems.Product"]);
        if (order is null)
            return new() { Entity = null, IsSuccessfull = false, Message = "There is no order with this Id" };
        return new() { Entity = order, IsSuccessfull = true };
    }

    public async Task<ResponseDTO<Order>> GetOrderForUpdateByIdAsync(Guid orderId)
    {
        var order = (await _OrderRepository.GetByIdAsync(orderId));
        if (order is null)
            return new() { Entity = null!, IsSuccessfull = false, Message = "There is no order with this Id" };
        return new() { Entity = order, IsSuccessfull = true };
    }

    public async Task<bool> UpdateAsync(Order order)
    {
        var response = await _OrderRepository.UpdateAsync(order);
        await _OrderRepository.SaveChangesAsync();
        return response is not null;
    }
}