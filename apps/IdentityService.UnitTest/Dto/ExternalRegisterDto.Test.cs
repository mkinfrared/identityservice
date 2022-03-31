using IdentityService.Dto;
using IdentityService.Features.Auth.ExternalProviderRedirect;

using Microsoft.AspNetCore.Authentication;

using Xunit;

namespace IdentityService.Unit.Dto;

public class ExternalRegisterDtoTest
{
    [Fact]
    public void Should_Have_Getters_And_Setters_For_Properties()
    {
        var result = new ExternalRegisterDto();
        var properties = new AuthenticationProperties();
        var provider = Providers.Google.ToString();

        result.Properties = properties;
        result.Provider = provider;

        Assert.Equal(properties, result.Properties);
        Assert.Equal(provider, result.Provider);
    }
}
