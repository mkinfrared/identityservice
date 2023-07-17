using System.Collections.Generic;
using System.Threading.Tasks;

using ApiScope = IdentityService.Features.ApiScope;

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
        var query = new ApiScope.GetById.GetByIdQuery(id);

        var result = await _mediator.Send(query);

        if (result != null)
        {
            return Ok(result);
        }

        return NotFound();
    }

    [HttpPost]
    public async Task<ActionResult> CreateApiScope(
        ApiScope.CreateApiScope.Command command
    )
    {
        var result = await _mediator.Send(command);

        return CreatedAtAction(
            nameof(GetApiScopeById),
            new { id = result?.Id },
            result
        );
    }

    [HttpGet]
    public async Task<ActionResult> GetAll(
        int? page,
        int? pageSize,
        bool? enabled,
        string? name,
        string? displayName,
        string? description,
        bool? required,
        bool? emphasize,
        bool? showInDiscoveryDocument,
        [FromQuery] List<string>? userClaims
    )
    {
        var query = new ApiScope.GetAll.GetAllQuery(
            page,
            pageSize,
            enabled,
            name,
            displayName,
            description,
            required,
            emphasize,
            showInDiscoveryDocument,
            userClaims
        );

        var result = await _mediator.Send(query);

        return Ok(result);
    }
}
