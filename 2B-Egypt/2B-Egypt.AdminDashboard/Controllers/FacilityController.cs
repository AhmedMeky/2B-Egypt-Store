using _2B_Egypt.Application.IServices;
using _2B_Egypt.Application.Services;
using _2B_Egypt.Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace _2B_Egypt.AdminDashboard.Controllers
{
    public class FacilityController : Controller
    {
        private readonly IFacilityService _facilityService;

        public FacilityController(IFacilityService facilityService)
        {
            _facilityService = facilityService;
        }
        public IActionResult Create()
        {
            return View();
        }
        public async Task<IActionResult> CreateFacility(CreateFacilityDTO Facility )
        {
            var faclilty = await _facilityService.CreateAsync(Facility);
            var faclilties = await _facilityService.GetAllAsync();
            if (faclilty.IsSuccessfull)
                return View("Create", faclilty.Entity);
            else
                ViewBag.ErrorMessage = faclilty.Message;
            return View("GetAllFacilities", faclilties.Entity);
        }
        public async Task<IActionResult> GetAllFacilities()
        {
            var faclilties = await _facilityService.GetAllAsync();
            if (faclilties.IsSuccessfull)
                return View("GetAllFacilities", faclilties.Entity);
            else
                return Content(faclilties.Message);
        }
        [HttpPost]
        public async Task<IActionResult> DeleteFacility(Facility facility)
        {
         await _facilityService.HardDeleteAsync(facility);
            return View("Create");
        }
    }
    }