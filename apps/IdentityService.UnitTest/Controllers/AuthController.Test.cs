using System;
using System.Threading;

using IdentityService.Controllers;
using IdentityService.Features.Auth.ConfirmEmail;
using IdentityService.Features.Auth.Login;
using IdentityService.Features.Auth.Logout;
using IdentityService.Features.Auth.Register;

using MediatR;

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
      .Setup(m =>
        m.Send(It.IsAny<Login.Command>(), It.IsAny<CancellationToken>()))
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
      .Setup(m =>
        m.Send(It.IsAny<Login.Command>(), It.IsAny<CancellationToken>()))
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

    var registerResult = new Mock<ConfirmEmail.Command>(userId, token, code);

    var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
      password, passwordConfirmation, returnUrl);

    _mediatrMock
      .Setup(m =>
        m.Send(It.IsAny<Register.Command>(), It.IsAny<CancellationToken>()))
      .ReturnsAsync(registerResult.Object);

    var result = await _controller.Register(command);

    Assert.IsType<OkObjectResult>(result);
    Assert.Equal(registerResult.Object, ((OkObjectResult)result).Value);
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
    ConfirmEmail.Command? registerResult = null;

    var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
      password, passwordConfirmation, returnUrl);

    _mediatrMock
      .Setup(m =>
        m.Send(It.IsAny<Register.Command>(), It.IsAny<CancellationToken>()))
      .ReturnsAsync(registerResult);

    var result = await _controller.Register(command);

    Assert.IsType<BadRequestResult>(result);
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
      .Setup(m =>
        m.Send(It.IsAny<ConfirmEmail.Command>(), It.IsAny<CancellationToken>()))
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
      .Setup(m =>
        m.Send(It.IsAny<ConfirmEmail.Command>(), It.IsAny<CancellationToken>()))
      .ReturnsAsync(verificationResult);

    var result = await _controller.VerifyEmail(command);

    Assert.IsType<BadRequestResult>(result);
  }

  [Fact]
  public async void Logout_Should_Return_Redirect_To_Login_Action()
  {
    var logoutId = "";

    var command = new Logout.Command(logoutId);

    _mediatrMock
      .Setup(m =>
        m.Send(It.IsAny<Logout.Command>(), It.IsAny<CancellationToken>()))
      .ReturnsAsync("");

    var result = await _controller.Logout(command);

    Assert.IsType<RedirectToActionResult>(result);

    var redirectResult = (RedirectToActionResult)result;

    Assert.Equal(nameof(_controller.Login), redirectResult.ActionName);
  }

  [Fact]
  public async void Logout_Should_Return_Redirect_To_Command_Result()
  {
    var logoutId = "valid-logout-id";
    var commandResult = "foobar";

    var command = new Logout.Command(logoutId);

    _mediatrMock
      .Setup(m =>
        m.Send(It.IsAny<Logout.Command>(), It.IsAny<CancellationToken>()))
      .ReturnsAsync(commandResult);

    var result = await _controller.Logout(command);

    Assert.IsType<RedirectResult>(result);

    var redirectResult = (RedirectResult)result;

    Assert.Equal(commandResult, redirectResult.Url);
  }
}
