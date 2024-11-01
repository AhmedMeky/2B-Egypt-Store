﻿using _2B_Egypt.Domain.Models;
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
    }
}
