using System;
using System.Threading;

using IdentityService.Controllers;
using IdentityService.Dto;
using IdentityService.Features.Auth.ConfirmEmail;
using IdentityService.Features.Auth.ForgotPassword;
using IdentityService.Features.Auth.Login;
using IdentityService.Features.Auth.Logout;
using IdentityService.Features.Auth.Register;
using IdentityService.Features.Auth.ResetPassword;
using IdentityService.Features.Auth.SendConfirmEmail;
using IdentityService.Unit.Utils;

using MediatR;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

using Moq;

using Xunit;

using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace IdentityService.Unit.Controllers;

public class AuthControllerTest
{
    private readonly AuthController _controller;

    private readonly Mock<IMediator> _mediatrMock = new();

    public AuthControllerTest()
    {
        _controller = new AuthController(_mediatrMock.Object);
    }

    [Fact]
    public async void Login_Should_Return_OK_With_A_String()
    {
        var username = "marklar";
        var password = "foobar";
        var returnUrl = "/foo/bar";
        var signInResult = SignInResult.Success;

        var command = new Login.Command(username, password, returnUrl);

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<Login.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(signInResult);

        var result = await _controller.Login(command);

        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async void Login_Should_Return_BadRequest()
    {
        var username = "marklar";
        var password = "foobar";
        var returnUrl = "/foo/bar";
        var signInResult = SignInResult.Failed;

        var command = new Login.Command(username, password, returnUrl);

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<Login.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(signInResult);

        var result = await _controller.Login(command);

        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public async void Register_Should_Return_Ok()
    {
        var username = "marklar";
        var firstName = "Kyle";
        var lastName = "Broflowski";
        var email = "kyle@coons.com";
        var phoneNumber = "+19519413344";
        var password = "Foobar";
        var passwordConfirmation = "Foobar2@";
        var returnUrl = "/foo/bar";
        var userId = Guid.NewGuid().ToString();
        var token = "secret-token";
        var code = 424242;

        var registerResult = IdentityResult.Success;
        var sendEmailResult = new Mock<ConfirmEmail.Command>(userId, token, code);

        var command = new Register.Command(
            username,
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            passwordConfirmation,
            returnUrl
        );

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<Register.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(registerResult);

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<SendConfirmEmail.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(sendEmailResult.Object);

        var result = await _controller.Register(command);

        Assert.IsType<OkObjectResult>(result.Result);
        Assert.Equal(sendEmailResult.Object, ((OkObjectResult)result.Result)?.Value);
    }

    [Fact]
    public async void Register_Should_Return_BadRequest()
    {
        var username = "marklar";
        var firstName = "Kyle";
        var lastName = "Broflowski";
        var email = "kyle@coons.com";
        var phoneNumber = "+19519413344";
        var password = "Foobar";
        var passwordConfirmation = "Foobar2@";
        var returnUrl = "/foo/bar";
        var registerResult = IdentityResult.Failed();

        var command = new Register.Command(
            username,
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
            passwordConfirmation,
            returnUrl
        );

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<Register.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(registerResult);

        var result = await _controller.Register(command);

        Assert.IsType<BadRequestObjectResult>(result.Result);
    }

    [Fact]
    public async void VerifyEmail_Should_Return_Ok()
    {
        var userId = "marklar";
        var token = "foobar";
        var code = 424242;
        var verificationResult = IdentityResult.Success;

        var command = new ConfirmEmail.Command(userId, token, code);

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<ConfirmEmail.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(verificationResult);

        var result = await _controller.VerifyEmail(command);

        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async void VerifyEmail_Should_Return_BadRequest()
    {
        var userId = "marklar";
        var token = "foobar";
        var code = 424242;
        var verificationResult = IdentityResult.Failed();

        var command = new ConfirmEmail.Command(userId, token, code);

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<ConfirmEmail.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(verificationResult);

        var result = await _controller.VerifyEmail(command);

        Assert.IsType<BadRequestResult>(result);
    }

    [Fact]
    public async void Logout_Should_Return_Redirect_To_Login_Action()
    {
        var logoutId = "";

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<Logout.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync("");

        var result = await _controller.Logout(logoutId);

        Assert.IsType<RedirectToActionResult>(result.Result);

        Assert.Equal(
            nameof(_controller.Login),
            ((RedirectToActionResult)result.Result)?.ActionName
        );
    }

    [Fact]
    public async void Logout_Should_Return_Redirect_To_Command_Result()
    {
        var logoutId = "valid-logout-id";
        var commandResult = "foobar";

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<Logout.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(commandResult);

        var result = await _controller.Logout(logoutId);

        Assert.IsType<RedirectResult>(result.Result);

        Assert.Equal(commandResult, ((RedirectResult)result.Result)?.Url);
    }

    [Fact]
    public async void ForgotPassword_Should_Return_Ok_Action_Result()
    {
        var urlHelperMock = MockHelpers.MockUrlHelper();

        _controller.Url = urlHelperMock.Object;
        _controller.ControllerContext.HttpContext = new DefaultHttpContext();

        var forgotPasswordDto = new ForgotPasswordDto();

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<ForgotPassword.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(() => null);

        var result = await _controller.ForgotPassword(forgotPasswordDto);

        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async void ResetPassword_Should_Return_Ok_Action_Result()
    {
        var userId = "userId";
        var token = "token";
        var password = "password";
        var confirmPassword = "password";

        var resetPasswordCommand = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<ResetPassword.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(IdentityResult.Success);

        var result = await _controller.ResetPassword(resetPasswordCommand);

        Assert.IsType<OkResult>(result);
    }

    [Fact]
    public async void ResetPassword_Should_Return_BadRequest_Action_Result()
    {
        var userId = "userId";
        var token = "token";
        var password = "password";
        var confirmPassword = "password";

        var resetPasswordCommand = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        _mediatrMock
            .Setup(m => m.Send(It.IsAny<ResetPassword.Command>(), It.IsAny<CancellationToken>()))
            .ReturnsAsync(IdentityResult.Failed());

        var result = await _controller.ResetPassword(resetPasswordCommand);

        Assert.IsType<BadRequestObjectResult>(result);
    }
}
