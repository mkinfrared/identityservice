using Microsoft.AspNetCore.Authentication;

namespace IdentityService.Dto;

public class ExternalRegisterDto
{
    public AuthenticationProperties Properties { get; set; }
    public string Provider { get; set; }
}
