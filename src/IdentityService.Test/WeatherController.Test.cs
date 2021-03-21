using IdentityService.Controllers;

using Microsoft.Extensions.Logging;

using Moq;

using Xunit;

namespace IdentityService.Unit
{
    public class WeatherController_Test
    {
        private readonly WeatherForecastController _controller;

        private readonly Mock<ILogger<WeatherForecastController>> _loggerMock =
            new Mock<ILogger<WeatherForecastController>>();

        public WeatherController_Test()
        {
            _controller = new WeatherForecastController(_loggerMock.Object);
        }

        [Fact]
        public void Get_ShouldReturn_WeatherInfo()
        {
            var result = _controller.Get();

            Assert.NotEmpty(result);
        }
    }
}
