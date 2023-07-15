using System.Collections.Generic;

using IdentityService.Dto.ApiScope;

namespace IdentityService.Dto.Consent;

public class ConsentReadDto
{
    public string? ClientName { get; set; }
    public string? ClientUrl { get; set; }
    public string? ClientLogoUrl { get; set; }
    public string? ReturnUrl { get; set; }
    public bool AllowRememberConsent { get; set; }

    public IEnumerable<ApiScopeReadDto>? IdentityScopes { get; set; }
    public IEnumerable<ApiScopeReadDto>? ApiScopes { get; set; }
}
