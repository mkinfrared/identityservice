using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;
using IdentityService.Features.Auth.SendConfirmEmail;
using IdentityService.Services;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.Web.CodeGeneration;

using Moq;

using NETCore.MailKit.Core;

using Xunit;

using ConfirmEmailCommand = IdentityService.Features.Auth.ConfirmEmail.ConfirmEmail.Command;

namespace IdentityService.Unit.Features;

public class SendConfirmEmailTest
{
  private readonly Mock<CacheService> _cacheMock;
  private readonly Mock<IEmailService> _emailServiceMock;
  private readonly Mock<IFileSystem> _fileMock;
  private readonly Mock<IWebHostEnvironment> _hostEnvironmentMock;
  private readonly Mock<UserManager<User>> _userManagerMock;

  public SendConfirmEmailTest()
  {
    _cacheMock = MockHelpers.MockCacheService();
    _emailServiceMock = new Mock<IEmailService>();
    _fileMock = new Mock<IFileSystem>();
    _hostEnvironmentMock = new Mock<IWebHostEnvironment>();
    _userManagerMock = MockHelpers.MockUserManager<User>();
  }

  [Fact]
  public void Command_Should_Have_Correct_Properties()
  {
    var username = "marklar";
    var command = new SendConfirmEmail.Command(username);

    Assert.Equal(username, command.Username);
  }

  [Fact]
  public async Task CommandHandler_Should_Return_ConfirmEmailCommand()
  {
    var username = "marklar";
    var emailToken = "foobar";
    var email = "marklar@coons.com";
    var userMock = new Mock<User>();

    userMock.Setup(user => user.Email).Returns(email);

    var command = new SendConfirmEmail.Command(
      username
    );

    _userManagerMock
      .Setup(manager => manager.FindByNameAsync(username))
      .ReturnsAsync(userMock.Object);

    _userManagerMock
      .Setup(manager => manager.GenerateEmailConfirmationTokenAsync(userMock.Object))
      .ReturnsAsync(emailToken);

    _hostEnvironmentMock.Setup(environment => environment.ContentRootPath).Returns("root");

    _fileMock.Setup(fileSystem => fileSystem.ReadAllText(It.IsAny<string>())).Returns("foobar");

    var commandHandler = new SendConfirmEmail.CommandHandler(
      _userManagerMock.Object,
      _cacheMock.Object,
      _fileMock.Object,
      _emailServiceMock.Object,
      _hostEnvironmentMock.Object
    );

    var result = await commandHandler.Handle(command, new CancellationToken());

    Assert.IsType<ConfirmEmailCommand>(result);

    _emailServiceMock.Verify(
      service =>
        service.SendAsync(
          It.IsAny<string>(),
          It.IsAny<string>(),
          It.IsAny<string>(),
          true,
          null
        ),
      Times.Once
    );
  }
}
