using System.Collections.Generic;

using IdentityService.Dto.ApiScope;
using IdentityService.Utils;

using MediatR;

namespace IdentityService.Features.ApiScope.GetAll;

public class GetAllQuery : IRequest<PaginatedList<ApiScopeReadDto>>
{
    public GetAllQuery(
        int? page = null,
        int? pageSize = null,
        bool? enabled = null,
        string? name = null,
        string? displayName = null,
        string? description = null,
        bool? required = null,
        bool? emphasize = null,
        bool? showInDiscoveryDocument = null,
        List<string>? userClaims = null
    )
    {
        Enabled = enabled;
        Name = name;
        DisplayName = displayName;
        Description = description;
        Required = required;
        Emphasize = emphasize;
        ShowInDiscoveryDocument = showInDiscoveryDocument;
        UserClaims = userClaims;
        Page = page;
        PageSize = pageSize;
    }

    public int? Page { get; }
    public int? PageSize { get; }

    public bool? Enabled { get; }
    public string? Name { get; }
    public string? DisplayName { get; }
    public string? Description { get; }
    public bool? Required { get; }
    public bool? Emphasize { get; }
    public bool? ShowInDiscoveryDocument { get; }
    public List<string>? UserClaims { get; }
}
