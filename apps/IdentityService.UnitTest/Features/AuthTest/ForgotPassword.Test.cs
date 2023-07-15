using System.Threading;
using System.Threading.Tasks;

using FluentValidation.TestHelper;

using IdentityService.Entities;
using IdentityService.Features.Auth.ForgotPassword;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.Web.CodeGeneration;

using Moq;

using NETCore.MailKit.Core;

using Xunit;

namespace IdentityService.Unit.Features.AuthTest;

public class ForgotPasswordTest
{
    private readonly Mock<UserManager<User>> _userManagerMock;
    private readonly Mock<IFileSystem> _fileMock;
    private readonly Mock<IEmailService> _emailServiceMock;
    private readonly Mock<IWebHostEnvironment> _hostEnvironmentMock;

    public ForgotPasswordTest()
    {
        _userManagerMock = MockHelpers.MockUserManager<User>();
        _fileMock = new Mock<IFileSystem>();
        _emailServiceMock = new Mock<IEmailService>();
        _hostEnvironmentMock = new Mock<IWebHostEnvironment>();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var email = "timmy@coons.com";
        var url = "/foo/bar";
        var returnUrl = "/mark/lar";
        var command = new ForgotPassword.Command(email, returnUrl, url);

        Assert.Equal(email, command.Email);
        Assert.Equal(url, command.Url);
        Assert.Equal(returnUrl, command.ReturnUrl);
    }

    [Fact]
    public async Task CommandHandler_Should_Return_Task()
    {
        var email = "timmy@coons.com";
        var url = "/foo/bar";
        var returnUrl = "/mark/lar";
        var command = new ForgotPassword.Command(email, returnUrl, url);

        _userManagerMock
            .Setup(manager => manager.FindByEmailAsync(email))
            .ReturnsAsync(() => null);

        var commandHandler = new ForgotPassword.CommandHandler(
            _userManagerMock.Object,
            _fileMock.Object,
            _emailServiceMock.Object,
            _hostEnvironmentMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            new CancellationToken()
        );

        Assert.Equal(Task.CompletedTask, result);

        _userManagerMock.Verify(
            manager => manager.IsEmailConfirmedAsync(It.IsAny<User>()),
            Times.Never
        );
    }

    [Fact]
    public async Task CommandHandler_Should_Verify_Email_And_Return_Task()
    {
        var email = "timmy@coons.com";
        var url = "/foo/bar";
        var returnUrl = "/mark/lar";
        var userMock = new Mock<User>();
        var command = new ForgotPassword.Command(email, returnUrl, url);

        _userManagerMock
            .Setup(manager => manager.FindByEmailAsync(email))
            .ReturnsAsync(userMock.Object);

        _userManagerMock
            .Setup(manager => manager.IsEmailConfirmedAsync(userMock.Object))
            .ReturnsAsync(false);

        var commandHandler = new ForgotPassword.CommandHandler(
            _userManagerMock.Object,
            _fileMock.Object,
            _emailServiceMock.Object,
            _hostEnvironmentMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            new CancellationToken()
        );

        Assert.Equal(Task.CompletedTask, result);

        _userManagerMock.Verify(
            manager => manager.IsEmailConfirmedAsync(It.IsAny<User>()),
            Times.Once
        );

        _userManagerMock.Verify(
            manager =>
                manager.GeneratePasswordResetTokenAsync(It.IsAny<User>()),
            Times.Never
        );

        _emailServiceMock.Verify(
            service =>
                service.SendAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    true,
                    null
                ),
            Times.Never
        );
    }

    [Fact]
    public async Task CommandHandler_Should_Send_Email_And_Return_Task()
    {
        var email = "timmy@coons.com";
        var url = "/foo/bar";
        var returnUrl = "/mark/lar";
        var userMock = new Mock<User>();
        var command = new ForgotPassword.Command(email, returnUrl, url);

        _userManagerMock
            .Setup(manager => manager.FindByEmailAsync(email))
            .ReturnsAsync(userMock.Object);

        _userManagerMock
            .Setup(manager => manager.IsEmailConfirmedAsync(userMock.Object))
            .ReturnsAsync(true);

        _hostEnvironmentMock
            .Setup(environment => environment.ContentRootPath)
            .Returns("root");

        _fileMock
            .Setup(fileSystem => fileSystem.ReadAllText(It.IsAny<string>()))
            .Returns("foobar");

        var commandHandler = new ForgotPassword.CommandHandler(
            _userManagerMock.Object,
            _fileMock.Object,
            _emailServiceMock.Object,
            _hostEnvironmentMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            new CancellationToken()
        );

        Assert.Equal(Task.CompletedTask, result);

        _userManagerMock.Verify(
            manager => manager.IsEmailConfirmedAsync(It.IsAny<User>()),
            Times.Once
        );

        _userManagerMock.Verify(
            manager =>
                manager.GeneratePasswordResetTokenAsync(It.IsAny<User>()),
            Times.Once
        );

        _emailServiceMock.Verify(
            service =>
                service.SendAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    true,
                    null
                ),
            Times.Once
        );
    }

    [Fact]
    public void Validator_Should_Have_Errors()
    {
        string? email = null;
        string? returnUrl = null;
        string? url = null;

        var validator = new ForgotPassword.Validator();
        var command = new ForgotPassword.Command(email, returnUrl, url);
        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Email);
        result.ShouldHaveValidationErrorFor(c => c.ReturnUrl);
        result.ShouldHaveValidationErrorFor(c => c.Url);
    }

    [Fact]
    public void Validator_Should_Not_Have_Error()
    {
        var email = "timmy@coons.com";
        var returnUrl = "/foo/bar";
        var url = "/mark/lar";

        var validator = new ForgotPassword.Validator();
        var command = new ForgotPassword.Command(email, returnUrl, url);
        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.Email);
        result.ShouldNotHaveValidationErrorFor(c => c.ReturnUrl);
        result.ShouldNotHaveValidationErrorFor(c => c.Url);
    }

    [Fact]
    public void Validator_Should_Not_Have_Error_When_Email_Is_Invalid()
    {
        var email = "timmy";
        var returnUrl = "/foo/bar";
        var url = "/mark/lar";

        var validator = new ForgotPassword.Validator();
        var command = new ForgotPassword.Command(email, returnUrl, url);
        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Email);
        result.ShouldNotHaveValidationErrorFor(c => c.ReturnUrl);
        result.ShouldNotHaveValidationErrorFor(c => c.Url);
    }
}
