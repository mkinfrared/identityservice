using System.Threading;

using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Validation;

using IdentityService.Features.Auth.Login;
using IdentityService.Unit.Utils;

using Moq;

using Xunit;

using Consent = IdentityService.Features.Consent.GetConsent.Consent;

namespace IdentityService.Unit.Features;

public class GetConsentTest
{
    private readonly Mock<IIdentityServerInteractionService> _interactionMock;

    public GetConsentTest()
    {
        _interactionMock = new Mock<IIdentityServerInteractionService>();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var returnUrl = "/foo/bar";
        var command = new Consent.GetConsentQuery(returnUrl);

        Assert.Equal(returnUrl, command.ReturnUrl);
    }

    [Fact]
    public async void CommandHandler_Should_Return_Null()
    {
        var returnUrl = "/foo/bar";
        var command = new Consent.GetConsentQuery(returnUrl);

        _interactionMock
            .Setup(service => service.GetAuthorizationContextAsync(returnUrl))
            .ReturnsAsync(() => null);

        var commandHandler = new Consent.GetConsentQueryHandler(_interactionMock.Object);

        var result = await commandHandler.Handle(command, new CancellationToken());

        Assert.Null(result);
    }

    [Fact]
    public async void CommandHandler_Should_Return_ConsentReadDto()
    {
        var returnUrl = "/foo/bar";
        var command = new Consent.GetConsentQuery(returnUrl);
        var authRequestMock = MockHelpers.MockAuthorizationRequest();

        _interactionMock
            .Setup(service => service.GetAuthorizationContextAsync(returnUrl))
            .ReturnsAsync(authRequestMock.Object);

        var commandHandler = new Consent.GetConsentQueryHandler(_interactionMock.Object);

        var result = await commandHandler.Handle(command, new CancellationToken());

        Assert.NotNull(result);
        Assert.Equal(returnUrl, result?.ReturnUrl);
    }
}
