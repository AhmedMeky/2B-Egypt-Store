namespace _2B_Egypt.AdminDashboard.Controllers;

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
        if(!ModelState.IsValid)
        {
            return View("Create", Facility);
        }
        var facility = await _facilityService.CreateAsync(Facility);
        if(facility.IsSuccessfull)
            return RedirectToAction("GetAllFacilities");
        else
            return View("Error404");
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
        await _facilityService.SoftDeleteAsync(facility);
        return RedirectToAction("GetAllFacilities");
    }
}
