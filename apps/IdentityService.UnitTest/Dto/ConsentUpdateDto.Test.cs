using System.Collections.Generic;

using IdentityService.Dto.ApiScope;
using IdentityService.Dto.Consent;

using Xunit;

namespace IdentityService.Unit.Dto;

public class ConsentUpdateDtoTest
{
    [Fact]
    public void Should_Have_Getters_And_Setters_For_Properties()
    {
        var result = new ConsentUpdateDto();
        var redirectUrl = "/foo/bar";
        var description = "foobar";
        var rememberConsent = true;
        var permissionGranted = true;
        var identityScopes = new List<ApiScopeUpdateDto> { new() };
        var apiScopes = new List<ApiScopeUpdateDto> { new() };

        result.RedirectUrl = redirectUrl;
        result.Description = description;
        result.RememberConsent = rememberConsent;
        result.PermissionGranted = permissionGranted;
        result.IdentityScopes = identityScopes;
        result.ApiScopes = apiScopes;

        Assert.Equal(redirectUrl, result.RedirectUrl);
        Assert.Equal(description, result.Description);
        Assert.Equal(rememberConsent, result.RememberConsent);
        Assert.Equal(permissionGranted, result.PermissionGranted);
        Assert.Equal(apiScopes, result.ApiScopes);
        Assert.Equal(identityScopes, result.IdentityScopes);
    }
}
