using System.Threading;
using System.Threading.Tasks;

using FluentValidation.TestHelper;

using IdentityService.Entities;
using IdentityService.Features.Auth.ConfirmEmail;
using IdentityService.Services;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Identity;

using Moq;

using Xunit;

namespace IdentityService.Unit.Features.AuthTest;

public class ConfirmEmailTest
{
    private readonly Mock<UserManager<User>> _userManagerMock;
    private readonly Mock<SignInManager<User>> _signInManagerMock;
    private readonly Mock<CacheService> _cacheMock;

    public ConfirmEmailTest()
    {
        _signInManagerMock = MockHelpers.MockSignInManger<User>();
        _userManagerMock = MockHelpers.MockUserManager<User>();
        _cacheMock = MockHelpers.MockCacheService();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var userId = "marklar";
        var token = "foobar";
        var code = 999999;
        var command = new ConfirmEmail.Command(userId, token, code);

        Assert.Equal(userId, command.UserId);
        Assert.Equal(token, command.Token);
        Assert.Equal(code, command.Code);
    }

    [Fact]
    public async Task CommandHandler_Should_Return_Failed_Result_When_User_Not_Found()
    {
        var userId = "marklar";
        var token = "foobar";
        var code = 999999;
        var command = new ConfirmEmail.Command(userId, token, code);

        _userManagerMock
            .Setup(manager => manager.FindByIdAsync(userId))
            .ReturnsAsync(() => null);

        _cacheMock
            .Setup(cache => cache.GetRecordAsync<int>(token))
            .ReturnsAsync(code);

        var commandHandler = new ConfirmEmail.CommandHandler(
            _userManagerMock.Object,
            _signInManagerMock.Object,
            _cacheMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            new CancellationToken()
        );

        Assert.False(result.Succeeded);
    }

    [Fact]
    public async Task CommandHandler_Should_Return_IdentityResult()
    {
        var userId = "marklar";
        var token = "foobar";
        var code = 999999;
        var user = new Mock<User>();
        var command = new ConfirmEmail.Command(userId, token, code);

        _userManagerMock
            .Setup(manager => manager.FindByIdAsync(userId))
            .ReturnsAsync(() => user.Object);

        _userManagerMock
            .Setup(manager => manager.ConfirmEmailAsync(user.Object, token))
            .ReturnsAsync(() => IdentityResult.Success);

        _cacheMock
            .Setup(cache => cache.GetRecordAsync<int>(token))
            .ReturnsAsync(code);

        var commandHandler = new ConfirmEmail.CommandHandler(
            _userManagerMock.Object,
            _signInManagerMock.Object,
            _cacheMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            new CancellationToken()
        );

        Assert.Equal(IdentityResult.Success, result);
    }

    [Fact]
    public void Validator_Should_Have_Error_When_UserId_Is_Null()
    {
        var validator = new ConfirmEmail.Validator();
        var command = new ConfirmEmail.Command(null, "token", 424242);
        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.UserId);
    }

    [Fact]
    public void Validator_Should_Not_Have_Error_When_UserId_Is_Specified()
    {
        var validator = new ConfirmEmail.Validator();
        var command = new ConfirmEmail.Command("userId", "token", 424242);
        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.UserId);
    }

    [Fact]
    public void Validator_Should_Have_Error_When_Token_Is_Null()
    {
        var validator = new ConfirmEmail.Validator();
        var command = new ConfirmEmail.Command("userId", null, 424242);
        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Token);
    }

    [Fact]
    public void Validator_Should_Not_Have_Error_When_Token_Is_Specified()
    {
        var validator = new ConfirmEmail.Validator();
        var command = new ConfirmEmail.Command("userId", "token", 424242);
        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.Token);
    }
}
