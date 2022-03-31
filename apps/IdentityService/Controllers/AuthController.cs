using System.Linq;
using System.Net;
using System.Threading.Tasks;

using IdentityService.Dto;
using IdentityService.Features.Auth.ConfirmEmail;
using IdentityService.Features.Auth.ExternalProviderRedirect;
using IdentityService.Features.Auth.ExternalProviderRegister;
using IdentityService.Features.Auth.ForgotPassword;
using IdentityService.Features.Auth.Login;
using IdentityService.Features.Auth.Logout;
using IdentityService.Features.Auth.Register;
using IdentityService.Features.Auth.ResetPassword;
using IdentityService.Features.Auth.SendConfirmEmail;

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

        return BadRequest(new { username = new[] { "Username or Password is incorrect" } });
    }

    [HttpPost]
    public async Task<ActionResult<ConfirmEmail.Command>> Register(Register.Command command)
    {
        var registerResult = await _mediator.Send(command);

        if (!registerResult.Succeeded)
        {
            var errors = registerResult.Errors.Select(error => error.Description);

            return BadRequest(new { username = errors });
        }

        var sendEmailCommand = new SendConfirmEmail.Command(command.Username);
        var sendEmailResult = await _mediator.Send(sendEmailCommand);

        return Ok(sendEmailResult);
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
    public async Task<ActionResult<string>> Logout(string logoutId)
    {
        var command = new Logout.Command(logoutId);
        var result = await _mediator.Send(command);

        if (string.IsNullOrEmpty(result))
        {
            return RedirectToAction(nameof(Login));
        }

        return Redirect(result);
    }

    [HttpPost]
    public async Task<ActionResult> ForgotPassword(ForgotPasswordDto dto)
    {
        var (email, returnUrl) = dto;
        var url = Url.Action("ResetPassword", "Account", null, HttpContext.Request.Scheme);
        var command = new ForgotPassword.Command(email, returnUrl, url);

        await _mediator.Send(command);

        return Ok();
    }

    [HttpPost]
    public async Task<ActionResult> ResetPassword(ResetPassword.Command command)
    {
        var result = await _mediator.Send(command);

        if (result.Succeeded)
        {
            return Ok();
        }

        var errors = result.Errors.Select(error => error.Description);

        return BadRequest(new { password = errors });
    }

    [HttpGet]
    public async Task<IActionResult> ExternalRegister(Providers provider, string returnUrl)
    {
        var redirectUri = Url.Action(
            nameof(ExternalCallback),
            "Auth",
            new { returnUrl },
            HttpContext.Request.Scheme
        );

        var command = new ExternalProviderRedirect.Command(provider, redirectUri);
        var result = await _mediator.Send(command);

        return Challenge(result.Properties, result.Provider);
    }

    [HttpGet]
    public async Task<IActionResult> ExternalCallback(string returnUrl)
    {
        var command = new ExternalProviderRegister.Command(returnUrl);

        var result = await _mediator.Send(command);

        if (result.Succeeded)
        {
            return Redirect(WebUtility.UrlDecode(returnUrl));
        }

        return RedirectToAction("Login", "Account", new { returnUrl });
    }
}
