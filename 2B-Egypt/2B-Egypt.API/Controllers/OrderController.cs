using _2B_Egypt.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace _2B_Egypt.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IOrderService _orderService;
    private readonly IMapper _mapper;

    public OrderController(IOrderService orderService, IMapper mapper)
    {
        this._orderService = orderService;
        this._mapper = mapper;
    }

    [HttpPost("[Action]")]
    public async Task<ActionResult> CreateOrder(CreateOrderDTO orderDTO)
    {
        if (ModelState.IsValid)
        {
            var response = await _orderService.CreateAsync(orderDTO);
            if (response.IsSuccessfull)
            {
                return StatusCode(200);
            }
        }
        return await Task.FromResult(BadRequest(ModelState));
    }

    [HttpGet("[Action]")]
    public async Task<ActionResult> GetAll(Guid userId)
    {
        var orders = await _orderService.GetAllOrderAsync(userId);
        if (!orders.IsSuccessfull)
            return BadRequest();
        var response = new
        {
            orders = orders.Entity.Select(ord =>
            new {
                Id = ord.Id,
                OrderNumber = ord.OrderNumber,
                Date = ord.CreatedAt,
                UserName = ord.User.FirstName + " " + ord.User.LastName,
                TotalAmount = ord.TotalAmount,
                StateAr = ord.Status_Er,
                StateEn = ord.Status_En
            })

    };
        return StatusCode(200,response.orders);
    }

    [HttpGet("[Action]")]
    public async Task<ActionResult> Details(Guid orderId)
    {
        var orderResponse = await _orderService.GetOrderByIdAsync(orderId);
        if(orderResponse.IsSuccessfull)
            return StatusCode(200,orderResponse.Entity);
        return NotFound();
    }

}