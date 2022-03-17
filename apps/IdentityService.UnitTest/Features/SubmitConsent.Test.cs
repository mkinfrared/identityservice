using System.Collections.Generic;
using System.Security.Claims;
using System.Threading;

using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Services;

using IdentityService.Dto;
using IdentityService.Features.Consent.SubmitConsent;
using IdentityService.Unit.Utils;

using Moq;

using Xunit;

namespace IdentityService.Unit.Features;

public class SubmitConsentTest
{
    private readonly Mock<IIdentityServerInteractionService> _interactionMock;
    private readonly Mock<IEventService> _eventsMock;

    public SubmitConsentTest()
    {
        _interactionMock = new Mock<IIdentityServerInteractionService>();
        _eventsMock = new Mock<IEventService>();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var consentUpdateMock = new Mock<ConsentUpdateDto>();
        var claimsPrincipalMock = new Mock<ClaimsPrincipal>();
        var command = new SubmitConsent.Command(
            consentUpdateMock.Object,
            claimsPrincipalMock.Object
        );

        Assert.Equal(claimsPrincipalMock.Object, command.User);
        Assert.Equal(consentUpdateMock.Object, command.Consent);
    }

    [Fact]
    public async void CommandHandler_Should_Return_Null()
    {
        var consentUpdateMock = new Mock<ConsentUpdateDto>();
        var claimsPrincipalMock = new Mock<ClaimsPrincipal>();
        var command = new SubmitConsent.Command(
            consentUpdateMock.Object,
            claimsPrincipalMock.Object
        );

        _interactionMock
            .Setup(service => service.GetAuthorizationContextAsync(It.IsAny<string>()))
            .ReturnsAsync(() => null);

        var commandHandler = new SubmitConsent.CommandHandler(
            _interactionMock.Object,
            _eventsMock.Object
        );

        var result = await commandHandler.Handle(command, new CancellationToken());

        Assert.Null(result);
    }

    [Fact]
    public async void CommandHandler_Should_Return_AuthorizationRequest_And_Raise_ConsentDeniedEvent()
    {
        var consentUpdateMock = new Mock<ConsentUpdateDto>();
        var claimsPrincipalMock = MockHelpers.MockClaimsPrincipal();
        var authRequestMock = MockHelpers.MockAuthorizationRequest();
        var command = new SubmitConsent.Command(consentUpdateMock.Object, claimsPrincipalMock);

        _interactionMock
            .Setup(service => service.GetAuthorizationContextAsync(It.IsAny<string>()))
            .ReturnsAsync(authRequestMock.Object);

        var commandHandler = new SubmitConsent.CommandHandler(
            _interactionMock.Object,
            _eventsMock.Object
        );

        var result = await commandHandler.Handle(command, new CancellationToken());

        Assert.NotNull(result);
        _eventsMock.Verify(
            service => service.RaiseAsync(It.IsAny<ConsentDeniedEvent>()),
            Times.Once
        );
    }

    [Fact]
    public async void CommandHandler_Should_Return_AuthorizationRequest_And_Raise_ConsentGrantedEvent()
    {
        var identityScopes = new List<ApiScopeUpdateDto> { new() };
        var apiScopes = new List<ApiScopeUpdateDto> { new() };
        var consentUpdateMock = new Mock<ConsentUpdateDto>();
        var claimsPrincipalMock = MockHelpers.MockClaimsPrincipal();
        var authRequestMock = MockHelpers.MockAuthorizationRequest();
        var command = new SubmitConsent.Command(consentUpdateMock.Object, claimsPrincipalMock);

        consentUpdateMock.Object.PermissionGranted = true;
        consentUpdateMock.Object.IdentityScopes = identityScopes;
        consentUpdateMock.Object.ApiScopes = apiScopes;

        _interactionMock
            .Setup(service => service.GetAuthorizationContextAsync(It.IsAny<string>()))
            .ReturnsAsync(authRequestMock.Object);

        var commandHandler = new SubmitConsent.CommandHandler(
            _interactionMock.Object,
            _eventsMock.Object
        );

        var result = await commandHandler.Handle(command, new CancellationToken());

        Assert.NotNull(result);
        _eventsMock.Verify(
            service => service.RaiseAsync(It.IsAny<ConsentGrantedEvent>()),
            Times.Once
        );
    }
}
