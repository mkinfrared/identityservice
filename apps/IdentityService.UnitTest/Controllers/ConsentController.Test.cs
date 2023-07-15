using System.Threading;
using System.Threading.Tasks;

using IdentityServer4.Models;

using IdentityService.Controllers;
using IdentityService.Dto.Consent;
using IdentityService.Features.Consent.SubmitConsent;

using MediatR;

using Microsoft.AspNetCore.Mvc;

using Moq;

using Xunit;

using Consent = IdentityService.Features.Consent.GetConsent.Consent;

namespace IdentityService.Unit.Controllers;

public class ConsentControllerTest
{
    private readonly ConsentController _controller;
    private readonly Mock<IMediator> _mediatrMock = new();

    public ConsentControllerTest()
    {
        _controller = new ConsentController(_mediatrMock.Object);
    }

    [Fact]
    public void Index_Should_Return_View()
    {
        var result = _controller.Index();
        Assert.NotNull(result);
        Assert.IsType<ViewResult>(result);
    }

    [Fact]
    public async Task GetConsent_Should_Return_Ok()
    {
        var returnUrl = "/foo/bar";
        var queryResult = new Mock<ConsentReadDto>();

        _mediatrMock
            .Setup(
                m =>
                    m.Send(
                        It.IsAny<Consent.GetConsentQuery>(),
                        It.IsAny<CancellationToken>()
                    )
            )
            .ReturnsAsync(queryResult.Object);

        var result = await _controller.GetConsent(returnUrl);

        Assert.NotNull(result);
        Assert.IsType<OkObjectResult>(result.Result);

        var value = ((OkObjectResult)result.Result)?.Value;

        Assert.Equal(queryResult.Object, value);
    }

    [Fact]
    public async Task SubmitConsent_Should_Return_BadRequest()
    {
        var consentUpdateMock = new Mock<ConsentUpdateDto>();

        _mediatrMock
            .Setup(
                m =>
                    m.Send(
                        It.IsAny<SubmitConsent.Command>(),
                        It.IsAny<CancellationToken>()
                    )
            )
            .ReturnsAsync(() => null);

        var result = await _controller.SubmitConsent(consentUpdateMock.Object);

        Assert.IsType<BadRequestResult>(result.Result);
    }

    [Fact]
    public async Task SubmitConsent_Should_Return_Ok()
    {
        var consentUpdateMock = new Mock<ConsentUpdateDto>();
        var authRequestMock = new Mock<AuthorizationRequest>();

        _mediatrMock
            .Setup(
                m =>
                    m.Send(
                        It.IsAny<SubmitConsent.Command>(),
                        It.IsAny<CancellationToken>()
                    )
            )
            .ReturnsAsync(authRequestMock.Object);

        var result = await _controller.SubmitConsent(consentUpdateMock.Object);

        Assert.IsType<OkObjectResult>(result.Result);
    }
}
