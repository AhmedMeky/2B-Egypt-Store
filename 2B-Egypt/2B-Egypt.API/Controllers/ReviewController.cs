namespace _2B_Egypt.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewController : ControllerBase
{
    public readonly IReviewService _reviewService;
    public ReviewController(IReviewService reviewService)
    {
        _reviewService = reviewService;
    }

    [HttpGet("{productId:guid}")]
    public async Task<ActionResult<IEnumerable<GetReviewDTO>>> Get(Guid productId)
    {
        var reviewResponse = await _reviewService.GetAllAsync(productId);
        if(reviewResponse.IsSuccessfull) 
            return Ok(reviewResponse.Entity);
        else 
            return BadRequest();
    }

    [HttpPost]
    public async Task<ActionResult<GetReviewDTO>> Create([FromBody] CreateOrUpdateReviewDTO review)
    {
        if (ModelState.IsValid)
        {
            var reviewResponse = await _reviewService.CreateAsync(review);
            if(reviewResponse.IsSuccessfull)
                return Created("Review", reviewResponse.Entity);
            else 
                return BadRequest(ModelState);
        }
        return BadRequest(ModelState);
    }


    [HttpPut("{reviewId}")]
    public async Task<ActionResult<GetReviewDTO>> Update(Guid reviewId, [FromBody] CreateOrUpdateReviewDTO reviewDto)
    {
        var review = await _reviewService.GetByIdAsync(reviewId);
        if (review.IsSuccessfull)
        {
            if (ModelState.IsValid)
            {
                var resultReview = await _reviewService.UpdateAsync(reviewDto, reviewId);
                return Created("Review", resultReview);
            }
        }
        return BadRequest(ModelState);
    }


    [HttpDelete("{reviewId}")]
    public async Task<ActionResult<GetReviewDTO>> RemoveReview(Guid reviewId)
    {
        if (reviewId != Guid.Empty)
        {
            var review = await _reviewService.GetByIdAsync(reviewId);
            if (review is not null)
            {
                await _reviewService.SoftDeleteAsync(reviewId);
                return Ok(review);
            }
            else
            {
                return NotFound();
            }
        }
        return NotFound();
    }
}
