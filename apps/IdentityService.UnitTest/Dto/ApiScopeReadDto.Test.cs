using IdentityService.Dto;

using Xunit;

namespace IdentityService.Unit.Dto;

public class ApiScopeReadDtoTest
{
    [Fact]
    public void Should_Have_Getters_And_Setters_For_Properties()
    {
        var result = new ApiScopeReadDto();
        var name = "marklar";
        var displayName = "foobar";
        var description = "theytookerjobs";
        var emphasize = true;
        var required = true;

        result.Name = name;
        result.DisplayName = displayName;
        result.Description = description;
        result.Emphasize = emphasize;
        result.Required = required;

        Assert.Equal(name, result.Name);
        Assert.Equal(displayName, result.DisplayName);
        Assert.Equal(description, result.Description);
        Assert.Equal(emphasize, result.Emphasize);
        Assert.Equal(required, result.Required);
    }
}
