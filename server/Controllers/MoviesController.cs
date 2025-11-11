using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        // GET: api/<MoviesController>
        [HttpGet]
        public IActionResult Get()
        {

            try
            {
                return Ok(Movie.Read());
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }


        // POST api/<MoviesController>
        [HttpPost]
        public IActionResult Post([FromBody] Movie m)
        {
            try
            {
                if (m == null) return BadRequest("Movie is null.");
                bool inserted = m.Insert();

                if (!inserted)
                    return Conflict("A movie with this Id already exists");
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
