using IdentityService.Dto;

using Xunit;

namespace IdentityService.Unit.Dto;

public class ApiScopeUpdateDtoTest
{
    [Fact]
    public void Should_Have_Getters_And_Setters_For_Properties()
    {
        var result = new ApiScopeUpdateDto();
        var name = "marklar";
        var displayName = "foobar";
        var description = "theytookerjobs";
        var emphasize = true;
        var required = true;
        var isPermitted = true;

        result.Name = name;
        result.DisplayName = displayName;
        result.Description = description;
        result.Emphasize = emphasize;
        result.Required = required;
        result.IsPermitted = isPermitted;

        Assert.Equal(name, result.Name);
        Assert.Equal(displayName, result.DisplayName);
        Assert.Equal(description, result.Description);
        Assert.Equal(emphasize, result.Emphasize);
        Assert.Equal(required, result.Required);
        Assert.Equal(isPermitted, result.IsPermitted);
    }
}
