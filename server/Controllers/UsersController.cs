using Microsoft.AspNetCore.Mvc;
using server.BL;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        [HttpPost("register")]
        public IActionResult Register([FromBody] Users u)
        {
            try
            {
                if (u == null)
                    return BadRequest("User is null.");

                int num = u.Register();

                if (num <= 0)
                    return Conflict("Email already exists or registration failed.");

                u.Password = null;
                return Ok(u);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        public class LoginRequest
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            try
            {
                if (request == null)
                    return BadRequest("Login data is null.");

                Users loggedUser = Users.Login(request.Email, request.Password);

                if (loggedUser == null)
                    return Unauthorized("Invalid email or password.");

                return Ok(loggedUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
