using System.Threading;

using FluentValidation.TestHelper;

using IdentityServer4.Models;
using IdentityServer4.Services;

using IdentityService.Entities;
using IdentityService.Features.Auth.Logout;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Identity;

using Moq;

using Xunit;

namespace IdentityService.Unit.Features.AuthTest;

public class LogoutTest
{
    private readonly Mock<SignInManager<User>> _signInManagerMock;
    private readonly Mock<IIdentityServerInteractionService> _interactionServiceMock;

    public LogoutTest()
    {
        _signInManagerMock = MockHelpers.MockSignInManger<User>();
        _interactionServiceMock = new Mock<IIdentityServerInteractionService>();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var logoutId = "marklar";

        var command = new Logout.Command(logoutId);

        Assert.Equal(logoutId, command.LogoutId);
    }

    [Fact]
    public async void CommandHandler_Should_Return_PostLogoutRedirectUri()
    {
        var logoutId = "marklar";
        var logoutRequest = new LogoutRequest("/foo", new LogoutMessage());
        logoutRequest.PostLogoutRedirectUri = "/bar";

        var command = new Logout.Command(logoutId);

        _interactionServiceMock
            .Setup(service => service.GetLogoutContextAsync(command.LogoutId))
            .ReturnsAsync(logoutRequest);

        var commandHandler = new Logout.CommandHandler(
            _signInManagerMock.Object,
            _interactionServiceMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            new CancellationToken()
        );

        Assert.Equal(logoutRequest.PostLogoutRedirectUri, result);
    }

    [Fact]
    public void Should_Return_An_Error_When_Fields_Are_Invalid()
    {
        string? logoutId = null;

        var validator = new Logout.Validator();

        var command = new Logout.Command(logoutId);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.LogoutId);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_Fields_Are_Valid()
    {
        string logoutId = "marklar";

        var validator = new Logout.Validator();

        var command = new Logout.Command(logoutId);

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.LogoutId);
    }
}
