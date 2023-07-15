using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using IdentityService.Controllers;
using IdentityService.Dto.ApiScope;
using IdentityService.Features.ApiScope.CreateApiScope;
using IdentityService.Features.ApiScope.GetById;

using MediatR;

using Microsoft.AspNetCore.Mvc;

using Moq;

using Xunit;

namespace IdentityService.Unit.Controllers
{
    public class ApiScopeControllerTests
    {
        private readonly Mock<IMediator> _mockMediator;
        private readonly ApiScopeController _controller;

        public ApiScopeControllerTests()
        {
            _mockMediator = new Mock<IMediator>();
            _controller = new ApiScopeController(_mockMediator.Object);
        }

        [Fact]
        public async Task GetApiScopeById_ReturnsOkResult_WhenApiScopeExists()
        {
            // Arrange
            var name = "marklar";

            var apiScope = new ApiScopeReadDto { Name = name }; // Use actual class here and define test data

            _mockMediator
                .Setup(
                    m =>
                        m.Send(
                            It.IsAny<ApiScope.GetByIdQuery>(),
                            It.IsAny<CancellationToken>()
                        )
                )
                .ReturnsAsync(apiScope);

            // Act
            var actionResult = await _controller.GetApiScopeById(1);

            // Assert
            var okObjectResult = Assert.IsType<OkObjectResult>(actionResult);
            Assert.Equal(apiScope, okObjectResult.Value);
        }

        [Fact]
        public async Task GetApiScopeById_ReturnsNotFound_WhenApiScopeDoesNotExist()
        {
            // Arrange
            _mockMediator
                .Setup(
                    m =>
                        m.Send(
                            It.IsAny<ApiScope.GetByIdQuery>(),
                            It.IsAny<CancellationToken>()
                        )
                )
                .ReturnsAsync((ApiScopeReadDto)null);

            // Act
            var actionResult = await _controller.GetApiScopeById(1);

            // Assert
            Assert.IsType<NotFoundResult>(actionResult);
        }

        [Fact]
        public async Task CreateApiScope_ReturnsCreatedAtAction()
        {
            // Arrange
            var name = "marklar";
            var description = "description";
            var displayName = "FOOBAR";
            bool emphasize = false;
            bool enabled = true;
            bool required = false;
            bool showInDiscoveryDocument = true;
            List<string> userClaims = new List<string> { "foo", "bar" };

            var newApiScope = new ApiScopeReadDto(); // Use actual class here and define test data

            _mockMediator
                .Setup(
                    m =>
                        m.Send(
                            It.IsAny<CreateApiScope.Command>(),
                            It.IsAny<CancellationToken>()
                        )
                )
                .ReturnsAsync(newApiScope);

            // Act
            var actionResult = await _controller.CreateApiScope(
                new CreateApiScope.Command(
                    description,
                    displayName,
                    emphasize,
                    enabled,
                    name,
                    required,
                    showInDiscoveryDocument,
                    userClaims
                )
            ); // Use actual class here

            // Assert
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(
                actionResult
            );

            Assert.Equal("GetApiScopeById", createdAtActionResult.ActionName);
            Assert.Equal(newApiScope, createdAtActionResult.Value);
        }
    }
}
