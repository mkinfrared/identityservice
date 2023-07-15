using System.Threading;
using System.Threading.Tasks;

using FluentValidation.TestHelper;

using IdentityService.Entities;
using IdentityService.Features.Auth.ResetPassword;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Identity;

using Moq;

using Xunit;

namespace IdentityService.Unit.Features.AuthTest;

public class ResetPasswordTest
{
    private readonly Mock<UserManager<User>> _userManagerMock;

    public ResetPasswordTest()
    {
        _userManagerMock = MockHelpers.MockUserManager<User>();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "marklar";
        var confirmPassword = "marklar";
        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        Assert.Equal(password, command.Password);
        Assert.Equal(confirmPassword, command.ConfirmPassword);
        Assert.Equal(token, command.Token);
        Assert.Equal(userId, command.UserId);
    }

    [Fact]
    public async Task CommandHandler_Should_Return_Failed_Identity_Result()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "marklar";
        var confirmPassword = "marklar";
        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        _userManagerMock
            .Setup(manager => manager.FindByIdAsync(userId))
            .ReturnsAsync(() => null!);

        var commandHandler = new ResetPassword.CommandHandler(
            _userManagerMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            new CancellationToken()
        );

        Assert.False(result?.Succeeded);

        _userManagerMock.Verify(
            manager =>
                manager.ResetPasswordAsync(
                    It.IsAny<User>(),
                    It.IsAny<string>(),
                    It.IsAny<string>()
                ),
            Times.Never
        );
    }

    [Fact]
    public async Task CommandHandler_Should_Return_Successful_Identity_Result()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "marklar";
        var confirmPassword = "marklar";
        var userMock = new Mock<User>();
        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        _userManagerMock
            .Setup(manager => manager.FindByIdAsync(userId))
            .ReturnsAsync(userMock.Object);
        _userManagerMock
            .Setup(
                manager =>
                    manager.ResetPasswordAsync(userMock.Object, token, password)
            )
            .ReturnsAsync(IdentityResult.Success);

        var commandHandler = new ResetPassword.CommandHandler(
            _userManagerMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            new CancellationToken()
        );

        Assert.True(result?.Succeeded);

        _userManagerMock.Verify(
            manager =>
                manager.ResetPasswordAsync(
                    It.IsAny<User>(),
                    It.IsAny<string>(),
                    It.IsAny<string>()
                ),
            Times.Once
        );
    }

    [Fact]
    public void Should_Return_An_Error_When_Password_Not_Includes_A_Digit()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "Foobar";
        var confirmPassword = "Foobar2@";

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Return_An_Error_When_Password_Not_Includes_A_Lowercase_Letter()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "FOOBAR2@";
        var confirmPassword = "FOOBAR2@";

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Return_An_Error_When_Password_Not_Includes_An_Uppercase_Letter()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "foobar2@";
        var confirmPassword = "foobar2@";

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Return_An_Error_When_Password_Not_Includes_A_Special_Character()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "Foobar2";
        var confirmPassword = "Foobar2";

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_Password_Is_Valid()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "Foobar2@";
        var confirmPassword = "Foobar2@";

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Return_An_Error_When_PasswordConfirmation_Not_Matches_Password()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "Foobar2@";
        var confirmPassword = "Foobar2";

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.ConfirmPassword);
    }

    [Fact]
    public void Should_Return_An_Error_When_PasswordConfirmation_Matches_Password()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "Foobar2@";
        var confirmPassword = "Foobar2@";

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.ConfirmPassword);
    }

    [Fact]
    public void Should_Return_An_Error_When_Fields_Are_Invalid()
    {
        string? userId = null;
        string? token = null;
        string? password = null;
        string? confirmPassword = null;

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.UserId);
        result.ShouldHaveValidationErrorFor(c => c.Token);
        result.ShouldHaveValidationErrorFor(c => c.Password);
        result.ShouldHaveValidationErrorFor(c => c.ConfirmPassword);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_Fields_Are_Valid()
    {
        var userId = "6CD67460-3AF9-4874-B098-A79D932C49F1";
        var token = "token";
        var password = "Foobar2@";
        var confirmPassword = "Foobar2@";

        var validator = new ResetPassword.Validator();

        var command = new ResetPassword.Command(
            userId,
            token,
            password,
            confirmPassword
        );

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.UserId);
        result.ShouldNotHaveValidationErrorFor(c => c.Token);
        result.ShouldNotHaveValidationErrorFor(c => c.Password);
        result.ShouldNotHaveValidationErrorFor(c => c.ConfirmPassword);
    }
}
