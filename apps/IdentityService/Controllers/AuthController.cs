using System.Threading.Tasks;

using IdentityService.Features.Auth.ConfirmEmail;
using IdentityService.Features.Auth.Login;
using IdentityService.Features.Auth.Logout;
using IdentityService.Features.Auth.Register;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Controllers;

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
      return Ok();
    }

    return BadRequest(new {username = new[] {"Username or Password is incorrect"}});
  }

  [HttpPost]
  public async Task<IActionResult> Register(Register.Command command)
  {
    var result = await _mediator.Send(command);

    if (result is null)
    {
      return BadRequest();
    }

    return Ok(result);
  }

  [HttpPost]
  public async Task<IActionResult> VerifyEmail(ConfirmEmail.Command command)
  {
    var result = await _mediator.Send(command);

    if (result.Succeeded)
    {
      return Ok();
    }

    return BadRequest();
  }

  [HttpGet]
  public async Task<IActionResult> Logout(string logoutId)
  {
    var command = new Logout.Command(logoutId);
    var result = await _mediator.Send(command);

    if (string.IsNullOrEmpty(result))
    {
      return RedirectToAction(nameof(Login));
    }

    return Redirect(result);
  }
}
