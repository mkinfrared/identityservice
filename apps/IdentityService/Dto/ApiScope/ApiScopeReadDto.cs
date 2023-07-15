using System.Collections.Generic;

namespace IdentityService.Dto.ApiScope;

public class ApiScopeReadDto
{
    public ApiScopeReadDto(string name = "")
    {
        Name = name;
        UserClaims = new List<string>();
    }

    public int Id { get; set; }

    public bool ShowInDiscoveryDocument { get; set; } = true;

    public string Name { get; set; }

    public string? DisplayName { get; set; }

    public string? Description { get; set; }

    public bool Required { get; set; }

    public bool Emphasize { get; set; }

    public bool Enabled { get; set; } = true;

    public List<string> UserClaims { get; set; }
}
