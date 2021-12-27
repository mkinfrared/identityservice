using IdentityService.Controllers;

using Microsoft.AspNetCore.Mvc;

using Xunit;

namespace IdentityService.Unit.Controllers;

public class AccountControllerTest
{
    private readonly AccountController _controller;

    public AccountControllerTest()
    {
        _controller = new AccountController();
    }

    [Fact]
    public void Login_Should_Return_A_View()
    {
        var result = _controller.Login();

        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public void Register_Should_Return_A_View()
    {
        var result = _controller.Register();

        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }
}