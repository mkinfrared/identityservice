using System.Threading.Tasks;

using IdentityServer4.Extensions;

using IdentityService.Dto;
using IdentityService.Entities;
using IdentityService.Features.Consent.GetConsent;
using IdentityService.Features.Consent.SubmitConsent;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Controllers;

public class ConsentController : Controller
{
    private readonly IMediator _mediator;

    public ConsentController(IMediator mediator)
    {
        _mediator = mediator;
    }

    public IActionResult Index()
    {
        return View("~/Views/Account/Login.cshtml");
    }

    [HttpGet]
    [Route("Consent/GetConsent")]
    [ApiExplorerSettings(IgnoreApi = false)]
    public async Task<ActionResult<ConsentReadDto>> GetConsent(string returnUrl)
    {
        var query = new Consent.GetConsentQuery(returnUrl);

        var result = await _mediator.Send(query);

        return Ok(result);
    }

    [HttpPost]
    [Route("Consent/SubmitConsent")]
    [ApiExplorerSettings(IgnoreApi = false)]
    public async Task<ActionResult<string>> SubmitConsent([FromBody] ConsentUpdateDto consent)
    {
        var command = new SubmitConsent.Command(consent, User);

        var result = await _mediator.Send(command);

        if (result == null)
        {
            return BadRequest();
        }

        return Ok(command.Consent.RedirectUrl);
    }
}
