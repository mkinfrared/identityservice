using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;
using IdentityService.Features.Auth.ExternalProviderRegister;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Identity;

using Moq;

using Xunit;

namespace IdentityService.Unit.Features;

public class ExternalProviderRegisterTest
{
    private readonly Mock<SignInManager<User>> _signInManagerMock;
    private readonly Mock<UserManager<User>> _userManagerMock;

    public ExternalProviderRegisterTest()
    {
        _signInManagerMock = MockHelpers.MockSignInManger<User>();
        _userManagerMock = MockHelpers.MockUserManager<User>();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var redirectUrl = "/mark/lar";
        var command = new ExternalProviderRegister.Command(redirectUrl);

        Assert.Equal(redirectUrl, command.RedirectUrl);
    }

    [Fact]
    public async Task CommandHandler_Should_Return_IdentityFailed_Result_When_Info_Is_Null()
    {
        var redirectUrl = "/mark/lar";
        var command = new ExternalProviderRegister.Command(redirectUrl);

        _signInManagerMock
            .Setup(manager => manager.GetExternalLoginInfoAsync(It.IsAny<string>()))
            .ReturnsAsync(() => null);

        var commandHandler = new ExternalProviderRegister.CommandHandler(
            _signInManagerMock.Object,
            _userManagerMock.Object
        );

        var result = await commandHandler.Handle(command, CancellationToken.None);

        Assert.IsType<IdentityResult>(result);
        Assert.False(result.Succeeded);

        _signInManagerMock.Verify(
            manager =>
                manager.ExternalLoginSignInAsync(
                    It.IsAny<string>(),
                    It.IsAny<string>(),
                    It.IsAny<bool>()
                ),
            Times.Never
        );
    }

    [Fact]
    public async Task CommandHandler_Should_Return_IdentitySuccess_Result_When_SignInResult_Is_Succeeded()
    {
        var redirectUrl = "/mark/lar";
        var command = new ExternalProviderRegister.Command(redirectUrl);
        var claimsPrincipalMock = new Mock<ClaimsPrincipal>();
        var loginProvider = "marklar";
        var providerKey = "foobar";
        var displayName = "foo";

        var infoMock = new ExternalLoginInfo(
            claimsPrincipalMock.Object,
            loginProvider,
            providerKey,
            displayName
        );

        _signInManagerMock
            .Setup(manager => manager.GetExternalLoginInfoAsync(It.IsAny<string>()))
            .ReturnsAsync(infoMock);

        _signInManagerMock
            .Setup(
                manager =>
                    manager.ExternalLoginSignInAsync(
                        It.IsAny<string>(),
                        It.IsAny<string>(),
                        It.IsAny<bool>()
                    )
            )
            .ReturnsAsync(SignInResult.Success);

        var commandHandler = new ExternalProviderRegister.CommandHandler(
            _signInManagerMock.Object,
            _userManagerMock.Object
        );

        var result = await commandHandler.Handle(command, CancellationToken.None);

        Assert.IsType<IdentityResult>(result);
        Assert.True(result.Succeeded);

        _userManagerMock.Verify(manager => manager.CreateAsync(It.IsAny<User>()), Times.Never);
    }

    [Fact]
    public async Task CommandHandler_Should_Return_IdentityFail_Result_When_CreateAsync_Failed()
    {
        var redirectUrl = "/mark/lar";
        var command = new ExternalProviderRegister.Command(redirectUrl);
        var claimsPrincipalMock = new Mock<ClaimsPrincipal>();
        var loginProvider = "marklar";
        var providerKey = "foobar";
        var displayName = "foo";

        var infoMock = new ExternalLoginInfo(
            claimsPrincipalMock.Object,
            loginProvider,
            providerKey,
            displayName
        );

        _signInManagerMock
            .Setup(manager => manager.GetExternalLoginInfoAsync(It.IsAny<string>()))
            .ReturnsAsync(infoMock);

        _signInManagerMock
            .Setup(
                manager =>
                    manager.ExternalLoginSignInAsync(
                        It.IsAny<string>(),
                        It.IsAny<string>(),
                        It.IsAny<bool>()
                    )
            )
            .ReturnsAsync(SignInResult.Failed);

        _userManagerMock
            .Setup(manager => manager.CreateAsync(It.IsAny<User>()))
            .ReturnsAsync(IdentityResult.Failed());

        var commandHandler = new ExternalProviderRegister.CommandHandler(
            _signInManagerMock.Object,
            _userManagerMock.Object
        );

        var result = await commandHandler.Handle(command, CancellationToken.None);

        Assert.IsType<IdentityResult>(result);
        Assert.False(result.Succeeded);

        _userManagerMock.Verify(
            manager => manager.AddLoginAsync(It.IsAny<User>(), It.IsAny<ExternalLoginInfo>()),
            Times.Never
        );
    }

    [Fact]
    public async Task CommandHandler_Should_Return_IdentityFail_Result_When_AddLoginAsync_Failed()
    {
        var redirectUrl = "/mark/lar";
        var command = new ExternalProviderRegister.Command(redirectUrl);
        var claimsPrincipalMock = new Mock<ClaimsPrincipal>();
        var loginProvider = "marklar";
        var providerKey = "foobar";
        var displayName = "foo";

        var infoMock = new ExternalLoginInfo(
            claimsPrincipalMock.Object,
            loginProvider,
            providerKey,
            displayName
        );

        _signInManagerMock
            .Setup(manager => manager.GetExternalLoginInfoAsync(It.IsAny<string>()))
            .ReturnsAsync(infoMock);

        _signInManagerMock
            .Setup(
                manager =>
                    manager.ExternalLoginSignInAsync(
                        It.IsAny<string>(),
                        It.IsAny<string>(),
                        It.IsAny<bool>()
                    )
            )
            .ReturnsAsync(SignInResult.Failed);

        _userManagerMock
            .Setup(manager => manager.CreateAsync(It.IsAny<User>()))
            .ReturnsAsync(IdentityResult.Success);

        _userManagerMock
            .Setup(manager => manager.AddLoginAsync(It.IsAny<User>(), infoMock))
            .ReturnsAsync(IdentityResult.Failed());

        var commandHandler = new ExternalProviderRegister.CommandHandler(
            _signInManagerMock.Object,
            _userManagerMock.Object
        );

        var result = await commandHandler.Handle(command, CancellationToken.None);

        Assert.IsType<IdentityResult>(result);
        Assert.False(result.Succeeded);

        _signInManagerMock.Verify(
            manager => manager.SignInAsync(It.IsAny<User>(), It.IsAny<bool>(), It.IsAny<string>()),
            Times.Never
        );
    }

    [Fact]
    public async Task CommandHandler_Should_Return_IdentitySuccess_And_Call_SignInAsync()
    {
        var redirectUrl = "/mark/lar";
        var command = new ExternalProviderRegister.Command(redirectUrl);
        var claimsPrincipalMock = new Mock<ClaimsPrincipal>();
        var loginProvider = "marklar";
        var providerKey = "foobar";
        var displayName = "foo";

        var infoMock = new ExternalLoginInfo(
            claimsPrincipalMock.Object,
            loginProvider,
            providerKey,
            displayName
        );

        _signInManagerMock
            .Setup(manager => manager.GetExternalLoginInfoAsync(It.IsAny<string>()))
            .ReturnsAsync(infoMock);

        _signInManagerMock
            .Setup(
                manager =>
                    manager.ExternalLoginSignInAsync(
                        It.IsAny<string>(),
                        It.IsAny<string>(),
                        It.IsAny<bool>()
                    )
            )
            .ReturnsAsync(SignInResult.Failed);

        _userManagerMock
            .Setup(manager => manager.CreateAsync(It.IsAny<User>()))
            .ReturnsAsync(IdentityResult.Success);

        _userManagerMock
            .Setup(manager => manager.AddLoginAsync(It.IsAny<User>(), infoMock))
            .ReturnsAsync(IdentityResult.Success);

        var commandHandler = new ExternalProviderRegister.CommandHandler(
            _signInManagerMock.Object,
            _userManagerMock.Object
        );

        var result = await commandHandler.Handle(command, CancellationToken.None);

        Assert.IsType<IdentityResult>(result);
        Assert.True(result.Succeeded);

        _signInManagerMock.Verify(
            manager => manager.SignInAsync(It.IsAny<User>(), It.IsAny<bool>(), It.IsAny<string>()),
            Times.Once
        );
    }
}
