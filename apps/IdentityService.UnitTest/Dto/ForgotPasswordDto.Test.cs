using IdentityService.Dto.ForgotPassword;

using Xunit;

namespace IdentityService.Unit.Dto;

public class ForgotPasswordDtoTest
{
    [Fact]
    public void Should_Have_Getters_And_Setters_For_Properties()
    {
        var result = new ForgotPasswordDto();
        var returnUrl = "/foo/bar";
        var email = "timmy@coons.com";

        result.Email = email;
        result.ReturnUrl = returnUrl;

        Assert.Equal(returnUrl, result.ReturnUrl);
        Assert.Equal(email, result.Email);
    }
}
