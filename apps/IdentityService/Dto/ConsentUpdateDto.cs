using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IdentityService.Dto;

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
