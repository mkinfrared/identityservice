using System.Threading.Tasks;

using IdentityService.Features.Auth.Login;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Controllers
{
    [ApiController]
    [Route("[controller]")]
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

            return BadRequest();
        }
    }
}
