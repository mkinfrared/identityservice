using System.Threading;

using IdentityService.Controllers;
using IdentityService.Features.Auth.Login;

using MediatR;

using Microsoft.AspNetCore.Mvc;

using Moq;

using Xunit;

using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace IdentityService.Unit.Controllers
{
    public class AuthControllerTest
    {
        private readonly AuthController _controller;

        private readonly Mock<IMediator> _mediatrMock = new Mock<IMediator>();

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

            Assert.IsType<OkObjectResult>(result);
            Assert.Equal(((OkObjectResult)result).Value, returnUrl);
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
    }
}
