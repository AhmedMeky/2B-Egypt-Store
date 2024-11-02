using _2B_Egypt.Domain.Models;
using _2B_Egypt.Domain.Models.Enums;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Egypt.AdminDashboard.Controllers
{
    public class OrderController : Controller
    {
        private readonly IOrderService _orderService;

        public OrderController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<IActionResult> Index()
        {
            var orderResponse = await _orderService.GetAllOrderAsync();
            if (!orderResponse.IsSuccessfull)
                return View("Error404");
            return View(orderResponse.Entity);
        }

        public async Task<IActionResult> Details(Guid id)
        {
            var orderResponse = await _orderService.GetOrderDetailsByIdAsync(id);
            if (!orderResponse.IsSuccessfull)
                return View("Error404");
            return View(orderResponse.Entity);
        }

        public async Task<IActionResult> Update(Guid id)
        {
            var orderResponse =
                await _orderService.GetOrderForUpdateByIdAsync(id);
            if (!orderResponse.IsSuccessfull)
                return View("Error404");
            setViewBag((int)orderResponse.Entity.Status_En);
            return View(orderResponse.Entity);
        }

        [HttpPost]
        public async Task<IActionResult> Update(Order order)
        {
            order.Status_Er = (OrderStatusAr)(int)order.Status_En;
            var ok = await _orderService.UpdateAsync(order);
            if (!ok)
                return View("Error404");
            return RedirectToAction("Index");
        }

        private void setViewBag(int currentValue)
        {
            List<Status> statuses =
                [
                    new(){Value = 1, Text = "Pendding"},
                    new(){Value = 2, Text = "Confirmed"},
                    new(){Value = 3, Text = "Shipped"},
                    new(){Value = 4, Text = "Attempted_delivery"},
                    new(){Value = 5, Text = "Received"},
                    new(){Value = 6, Text = "Canceled"},

                ];
            ViewBag.statuses = new SelectList(statuses, "Value", "Text", currentValue);
        }
    }
    public class Status
    {
        public int Value { get; set; }
        public string Text { get; set; }
    }
}
