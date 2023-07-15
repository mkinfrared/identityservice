using System.Threading.Tasks;

using IdentityService.Features.ApiScope.CreateApiScope;
using IdentityService.Features.ApiScope.GetById;

using MediatR;

using Microsoft.AspNetCore.Mvc;

namespace IdentityService.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class ApiScopeController : Controller
{
    private readonly IMediator _mediator;

    public ApiScopeController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult> GetApiScopeById(int id)
    {
        var query = new ApiScope.GetByIdQuery(id);

        var result = await _mediator.Send(query);

        if (result != null)
        {
            return Ok(result);
        }

        return NotFound();
    }

    [HttpPost]
    public async Task<ActionResult> CreateApiScope(
        CreateApiScope.Command command
    )
    {
        var result = await _mediator.Send(command);

        return CreatedAtAction(
            nameof(GetApiScopeById),
            new { id = result?.Id },
            result
        );
    }
}
