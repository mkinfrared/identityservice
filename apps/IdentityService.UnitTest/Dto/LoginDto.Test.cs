using IdentityService.Dto;

using Xunit;

namespace IdentityService.Unit.Dto;

public class LoginDtoTest
{
    [Fact]
    public void Should_Have_Getters_And_Setters_For_Properties()
    {
        var result = new LoginDto();
        var username = "marklar";
        var password = "foobar";
        var returnUrl = "/foo/bar";

        result.Username = username;
        result.Password = password;
        result.ReturnUrl = returnUrl;

        Assert.Equal(username, result.Username);
        Assert.Equal(password, result.Password);
        Assert.Equal(returnUrl, result.ReturnUrl);
    }
}
