namespace IdentityService.Dto;

public class ApiScopeReadDto
{
    public string? Name { get; set; }
    public string? DisplayName { get; set; }
    public string? Description { get; set; }
    public bool Emphasize { get; set; }
    public bool Required { get; set; }
}
