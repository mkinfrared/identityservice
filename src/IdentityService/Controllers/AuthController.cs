using System.Threading.Tasks;

using IdentityService.Features.Auth.Login;
using IdentityService.Features.Auth.Register;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
    public class AuthController : ControllerBase
    {
        private readonly IMediator _mediator;

        public AuthController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Login(Login.Command command)
        {
            var signInResult = await _mediator.Send(command);

            if (signInResult.Succeeded)
            {
                return Ok(command.ReturnUrl);
            }

            return BadRequest(new
            {
                username = new[] {"Username or Password is incorrect"}
            });
        }

        [HttpPost]
        public async Task<IActionResult> Register(Register.Command command)
        {
            var registerResult = await _mediator.Send(command);

            if (registerResult.Succeeded)
            {
                return Ok(command.RedirectUrl);
            }

            return BadRequest();
        }
    }
}
