using System.Collections.Generic;

using IdentityService.Dto;

using Xunit;

namespace IdentityService.Unit.Dto;

public class ConsentReadDtoTest
{
    [Fact]
    public void Should_Have_Getters_And_Setters_For_Properties()
    {
        var result = new ConsentReadDto();
        var clientName = "marklar";
        var clientUrl = "foobar";
        var clientLogoUrl = "/foo/bar";
        var returnUrl = "/mark/lar";
        var allowRememberConsent = true;
        var identityScopes = new List<ApiScopeReadDto> { new() };
        var apiScopes = new List<ApiScopeReadDto> { new() };

        result.ClientName = clientName;
        result.ClientUrl = clientUrl;
        result.ClientLogoUrl = clientLogoUrl;
        result.ReturnUrl = returnUrl;
        result.AllowRememberConsent = allowRememberConsent;
        result.IdentityScopes = identityScopes;
        result.ApiScopes = apiScopes;

        Assert.Equal(clientName, result.ClientName);
        Assert.Equal(clientUrl, result.ClientUrl);
        Assert.Equal(clientLogoUrl, result.ClientLogoUrl);
        Assert.Equal(returnUrl, result.ReturnUrl);
        Assert.Equal(allowRememberConsent, result.AllowRememberConsent);
        Assert.Equal(apiScopes, result.ApiScopes);
        Assert.Equal(identityScopes, result.IdentityScopes);
    }
}
