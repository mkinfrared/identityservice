using System.Threading;
using System.Threading.Tasks;

using IdentityService.Dto;
using IdentityService.Entities;
using IdentityService.Features.Auth.ExternalProviderRedirect;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;

using Moq;

using Xunit;

namespace IdentityService.Unit.Features.AuthTest;

public class ExternalProviderRedirectTest
{
    private readonly Mock<SignInManager<User>> _signInManagerMock;

    public ExternalProviderRedirectTest()
    {
        _signInManagerMock = MockHelpers.MockSignInManger<User>();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var provider = Providers.Google;
        var redirectUri = "/mark/lar";
        var command = new ExternalProviderRedirect.Command(
            provider,
            redirectUri
        );

        Assert.Equal(provider, command.Provider);
        Assert.Equal(redirectUri, command.RedirectUri);
    }

    [Fact]
    public async Task CommandHandler_Should_Return_ExternalRegisterDto()
    {
        var provider = Providers.Google;
        var redirectUri = "/mark/lar";
        var command = new ExternalProviderRedirect.Command(
            provider,
            redirectUri
        );

        _signInManagerMock
            .Setup(
                manager =>
                    manager.ConfigureExternalAuthenticationProperties(
                        It.IsAny<string>(),
                        redirectUri,
                        It.IsAny<string>()
                    )
            )
            .Returns(new AuthenticationProperties());

        var commandHandler = new ExternalProviderRedirect.CommandHandler(
            _signInManagerMock.Object
        );

        var result = await commandHandler.Handle(
            command,
            CancellationToken.None
        );

        Assert.IsType<ExternalRegisterDto>(result);
    }
}
