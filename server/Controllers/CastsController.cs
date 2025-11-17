using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

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

        // POST api/<CastsController>
        [HttpPost]
        public IActionResult Post([FromBody] Cast c)
        {
            try
            {
                if (c == null) return BadRequest("Cast is null.");
                bool inserted = c.Insert();

                if (!inserted)
                    return Conflict("A cast member with this Id already exists");
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
