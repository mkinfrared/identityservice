using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using IdentityService.Dto.ApiScope;

namespace IdentityService.Dto.Consent;

public class ConsentUpdateDto
{
    [Required]
    public string? RedirectUrl { get; set; }

    [Required]
    public string? Description { get; set; }

    [Required]
    public bool RememberConsent { get; set; }

    [Required]
    public bool PermissionGranted { get; set; }

    [Required]
    public IEnumerable<ApiScopeUpdateDto>? IdentityScopes { get; set; }

    [Required]
    public IEnumerable<ApiScopeUpdateDto>? ApiScopes { get; set; }
}
