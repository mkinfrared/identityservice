using System.Threading;

using FluentValidation.TestHelper;

using IdentityService.Entities;
using IdentityService.Features.Auth.Login;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Identity;

using Moq;

using Xunit;

namespace IdentityService.Unit.Features;

public class LoginTest
{
  private readonly Mock<SignInManager<User>> _signInManagerMock;
  private readonly Mock<UserManager<User>> _userManagerMock;

  public LoginTest()
  {
    _signInManagerMock = MockHelpers.MockSignInManger<User>();
    _userManagerMock = MockHelpers.MockUserManager<User>();
  }

  [Fact]
  public void Command_Should_Have_Correct_Properties()
  {
    var username = "marklar";
    var password = "foobar";
    var returnUrl = "/foo/bar";
    var command = new Login.Command(username, password, returnUrl);

    Assert.Equal(username, command.Username);
    Assert.Equal(password, command.Password);
    Assert.Equal(returnUrl, command.ReturnUrl);
  }

  [Fact]
  public async void CommandHandler_Should_Return_Failed_SignInResult_When_User_Not_Found()
  {
    var username = "marklar";
    var password = "foobar";
    var returnUrl = "/foo/bar";
    var command = new Login.Command(username, password, returnUrl);

    _userManagerMock.Setup(manager => manager.FindByNameAsync(username))
      .ReturnsAsync(() => null);

    var commandHandler =
      new Login.CommandHandler(_userManagerMock.Object, _signInManagerMock.Object);

    var result = await commandHandler.Handle(command, new CancellationToken());

    Assert.Equal(SignInResult.Failed, result);
  }

  [Fact]
  public async void CommandHandler_Should_Return_SignInResult()
  {
    var username = "marklar";
    var password = "foobar";
    var returnUrl = "/foo/bar";
    var command = new Login.Command(username, password, returnUrl);
    var user = new User();

    _userManagerMock.Setup(manager => manager.FindByNameAsync(username))
      .ReturnsAsync(user);

    _signInManagerMock.Setup(manager =>
        manager.PasswordSignInAsync(user, password, true, false))
      .ReturnsAsync(SignInResult.Success);

    var commandHandler =
      new Login.CommandHandler(_userManagerMock.Object, _signInManagerMock.Object);

    var result = await commandHandler.Handle(command, new CancellationToken());

    Assert.Equal(SignInResult.Success, result);
  }

  [Fact]
  public void Validator_Should_Have_Error_When_Username_Is_Null()
  {
    var validator = new Login.Validator();
    var command = new Login.Command(null, "password", "returnUrl");
    var result = validator.TestValidate(command);

    result.ShouldHaveValidationErrorFor(c => c.Username);
  }

  [Fact]
  public void Validator_Should_Not_Have_Error_When_Username_Is_Specified()
  {
    var validator = new Login.Validator();
    var command = new Login.Command("username", "password", "returnUrl");
    var result = validator.TestValidate(command);

    result.ShouldNotHaveValidationErrorFor(c => c.Username);
  }

  [Fact]
  public void Validator_Should_Have_Error_When_Password_Is_Null()
  {
    var validator = new Login.Validator();
    var command = new Login.Command("username", null, "returnUrl");
    var result = validator.TestValidate(command);

    result.ShouldHaveValidationErrorFor(c => c.Password);
  }

  [Fact]
  public void Validator_Should_Not_Have_Error_When_Password_Is_Specified()
  {
    var validator = new Login.Validator();
    var command = new Login.Command("username", "password", "returnUrl");
    var result = validator.TestValidate(command);

    result.ShouldNotHaveValidationErrorFor(c => c.Password);
  }

  [Fact]
  public void Validator_Should_Have_Error_When_ReturnUrl_Is_Null()
  {
    var validator = new Login.Validator();
    var command = new Login.Command("username", "password", null);
    var result = validator.TestValidate(command);

    result.ShouldHaveValidationErrorFor(c => c.ReturnUrl);
  }

  [Fact]
  public void Validator_Should_Not_Have_Error_When_ReturnUrl_Is_Specified()
  {
    var validator = new Login.Validator();
    var command = new Login.Command("username", "password", "returnUrl");
    var result = validator.TestValidate(command);

    result.ShouldNotHaveValidationErrorFor(c => c.ReturnUrl);
  }
}
