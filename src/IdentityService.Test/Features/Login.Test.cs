using System.Threading;

using IdentityService.Entities;
using IdentityService.Features.Auth.Login;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Identity;

using Moq;

using Xunit;

namespace IdentityService.Unit.Features
{
    public class LoginTest
    {
        private readonly Mock<SignInManager<User>> _signInManagerMock;
        private readonly Mock<UserManager<User>> _userManagerMock;

        public LoginTest()
        {
            _signInManagerMock = MockHelpers.MockSignInManger<User>();
            _userManagerMock = MockHelpers.MockUserManager<User>();
        }

        [Fact]
        public void Command_Should_Have_Correct_Properties()
        {
            var username = "marklar";
            var password = "foobar";
            var returnUrl = "/foo/bar";
            var command = new Login.Command(username, password, returnUrl);

            Assert.Equal(username, command.Username);
            Assert.Equal(password, command.Password);
            Assert.Equal(returnUrl, command.ReturnUrl);
        }

        [Fact]
        public async void CommandHandler_Should_Return_Failed_SignInResult_When_User_Not_Found()
        {
            var username = "marklar";
            var password = "foobar";
            var returnUrl = "/foo/bar";
            var command = new Login.Command(username, password, returnUrl);

            _userManagerMock.Setup(manager => manager.FindByNameAsync(username))
                .ReturnsAsync(() => null);

            var commandHandler =
                new Login.CommandHandler(_userManagerMock.Object, _signInManagerMock.Object);

            var result = await commandHandler.Handle(command, new CancellationToken());

            Assert.Equal(SignInResult.Failed, result);
        }

        [Fact]
        public async void CommandHandler_Should_Return_SignInResult()
        {
            var username = "marklar";
            var password = "foobar";
            var returnUrl = "/foo/bar";
            var command = new Login.Command(username, password, returnUrl);
            var user = new User();

            _userManagerMock.Setup(manager => manager.FindByNameAsync(username))
                .ReturnsAsync(user);

            _signInManagerMock.Setup(manager =>
                    manager.PasswordSignInAsync(user, password, true, false))
                .ReturnsAsync(SignInResult.Success);

            var commandHandler =
                new Login.CommandHandler(_userManagerMock.Object, _signInManagerMock.Object);

            var result = await commandHandler.Handle(command, new CancellationToken());

            Assert.Equal(SignInResult.Success, result);
        }
    }
}
