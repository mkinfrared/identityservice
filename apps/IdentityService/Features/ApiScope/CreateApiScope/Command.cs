using System.Collections.Generic;

using IdentityService.Dto.ApiScope;

using MediatR;

namespace IdentityService.Features.ApiScope.CreateApiScope;

public class Command : IRequest<ApiScopeReadDto?>
{
    public Command(
        string? description,
        string? displayName,
        bool emphasize,
        bool enabled,
        string name,
        bool required,
        bool showInDiscoveryDocument,
        List<string> userClaims
    )
    {
        Description = description;
        DisplayName = displayName;
        Emphasize = emphasize;
        Enabled = enabled;
        Name = name;
        Required = required;
        ShowInDiscoveryDocument = showInDiscoveryDocument;
        UserClaims = userClaims;
    }

    public string? Description { get; }
    public string? DisplayName { get; }
    public bool? Emphasize { get; }

    public bool? Enabled { get; }
    public string Name { get; }

    public bool? Required { get; }

    public bool? ShowInDiscoveryDocument { get; }
    public List<string>? UserClaims { get; }
}
