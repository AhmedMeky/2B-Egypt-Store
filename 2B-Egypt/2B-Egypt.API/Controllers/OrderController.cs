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
        if(ModelState.IsValid)
        {
            var response = await _orderService.CreateAsync(orderDTO);
            if(response.IsSuccessfull)
            {
                return StatusCode(200);
            }
        }
        return await Task.FromResult(BadRequest(ModelState));
    }
}