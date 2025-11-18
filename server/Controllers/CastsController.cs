using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.BL;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CastsController : ControllerBase
    {
        // GET: api/<CastsController>
        [HttpGet]
        public IActionResult Get()
        {

            try
            {
                return Ok(Cast.Read());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
