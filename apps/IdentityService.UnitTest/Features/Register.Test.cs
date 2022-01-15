using System;
using System.IO;
using System.Threading;

using FluentValidation.TestHelper;

using IdentityService.Entities;
using IdentityService.Extensions;
using IdentityService.Features.Auth.Register;
using IdentityService.Services;
using IdentityService.Unit.Utils;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.VisualStudio.Web.CodeGeneration;

using Moq;

using NETCore.MailKit.Core;

using Xunit;

using ConfirmEmailCommand = IdentityService.Features.Auth.ConfirmEmail.ConfirmEmail.Command;

namespace IdentityService.Unit.Features;

public class RegisterTest
{
    private readonly Mock<IEmailService> _emailServiceMock;
    private readonly Mock<UserManager<User>> _userManagerMock;
    private readonly Mock<CacheService> _cacheMock;
    private readonly Mock<IWebHostEnvironment> _hostEnvironmentMock;
    private readonly Mock<IFileSystem> _fileMock;

    public RegisterTest()
    {
        _emailServiceMock = new Mock<IEmailService>();
        _userManagerMock = MockHelpers.MockUserManager<User>();
        _cacheMock = MockHelpers.MockCacheService();
        _hostEnvironmentMock = new Mock<IWebHostEnvironment>();
        _fileMock = new Mock<IFileSystem>();
    }

    [Fact]
    public void Command_Should_Have_Correct_Properties()
    {
        var username = "marklar";
        var firstName = "Kyle";
        var lastName = "Broflowski";
        var email = "kyle@coons.com";
        var phoneNumber = "+19519413344";
        var password = "Foobar";
        var passwordConfirmation = "Foobar2@";
        var returnUrl = "/foo/bar";

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, returnUrl);

        Assert.Equal(username, command.Username);
        Assert.Equal(firstName, command.FirstName);
        Assert.Equal(lastName, command.LastName);
        Assert.Equal(email, command.Email);
        Assert.Equal(phoneNumber, command.PhoneNumber);
        Assert.Equal(password, command.Password);
        Assert.Equal(passwordConfirmation, command.PasswordConfirmation);
        Assert.Equal(returnUrl, command.RedirectUrl);
    }

    [Fact]
    public async void CommandHandler_Should_Return_ConfrimEmailCommand()
    {
        var username = "marklar";
        var firstName = "Kyle";
        var lastName = "Broflowski";
        var email = "kyle@coons.com";
        var phoneNumber = "+19519413344";
        var password = "Foobar";
        var passwordConfirmation = "Foobar2@";
        var redirectUrl = "/foo/bar";
        var token = "security-token";

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        _userManagerMock
            .Setup(manager => manager.CreateAsync(It.IsAny<User>(), command.Password))
            .ReturnsAsync(IdentityResult.Success);

        _userManagerMock
            .Setup(manager => manager.GenerateEmailConfirmationTokenAsync(It.IsAny<User>()))
            .ReturnsAsync(token);

        _hostEnvironmentMock.Setup(environment => environment.ContentRootPath).Returns("root");

        _fileMock.Setup(fileSystem => fileSystem.ReadAllText(It.IsAny<string>()))
            .Returns("foobar");

        var commandHandler =
            new Register.CommandHandler(_userManagerMock.Object, _emailServiceMock.Object,
                _cacheMock.Object, _hostEnvironmentMock.Object, _fileMock.Object);

        var result = await commandHandler.Handle(command, new CancellationToken());

        Assert.IsType<ConfirmEmailCommand>(result);

        _emailServiceMock.Verify(service => service.SendAsync(It.IsAny<string>(),
            It.IsAny<string>(), It.IsAny<string>(), true, null), Times.Once);
    }

    [Fact]
    public async void CommandHandler_Should_Return_Null()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        _userManagerMock
            .Setup(manager => manager.CreateAsync(It.IsAny<User>(), command.Password))
            .ReturnsAsync(IdentityResult.Failed());

        var commandHandler =
            new Register.CommandHandler(_userManagerMock.Object, _emailServiceMock.Object,
                _cacheMock.Object, _hostEnvironmentMock.Object, _fileMock.Object);

        var result = await commandHandler.Handle(command, new CancellationToken());

        Assert.Null(result);

        _emailServiceMock.Verify(service => service.SendAsync(It.IsAny<string>(),
            It.IsAny<string>(), It.IsAny<string>(), true, null), Times.Never);
    }

    [Fact]
    public void Should_Return_An_Error_When_Username_Is_Null()
    {
        const string username = null;
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Username);
    }

    [Fact]
    public void Should_Return_An_Error_When_Username_Has_Less_Than_Three_Characters()
    {
        const string username = "us";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Username);
    }

    [Fact]
    public void Should_Return_An_Error_When_Username_Has_More_Than_Twenty_Characters()
    {
        const string username = "abcdefghijklmnopqrstuvwxyz";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Username);
    }

    [Fact]
    public void Should_Return_An_Error_When_Username_Contains_Special_Characters()
    {
        const string username = "marklar*";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Username);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_Username_Is_Valid()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.Username);
    }

    [Fact]
    public void Should_Return_An_Error_When_FirstName_Has_Invalid_Character()
    {
        const string username = "marklar";
        const string firstName = "Kyle9";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.FirstName);
    }

    [Fact]
    public void Should_Return_An_Error_When_FirstName_Has_More_Than_Fifty_Characters()
    {
        const string username = "marklar";
        const string firstName = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.FirstName);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_FirstName_Is_Valid()
    {
        const string username = "marklar";
        const string firstName = "Kyle-Stan";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.FirstName);
    }

    [Fact]
    public void Should_Return_An_Error_When_LastName_Has_Invalid_Character()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski7";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.LastName);
    }

    [Fact]
    public void Should_Return_An_Error_When_LastName_Has_More_Than_Fifty_Characters()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.LastName);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_LastName_Is_Valid()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.LastName);
    }

    [Fact]
    public void Should_Return_An_Error_When_Email_Is_Null()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = null;
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Email);
    }

    [Fact]
    public void Should_Return_An_Error_When_Email_Is_Not_An_Email_Address()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kylecoons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Email);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_Email_Is_Valid()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519413344";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.Email);
    }

    [Fact]
    public void Should_Return_An_Error_When_PhoneNumber_Is_Null()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = null;
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.PhoneNumber);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_PhoneNumber_Is_Valid()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519418877";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.PhoneNumber);
    }

    [Fact]
    public void Should_Return_An_Error_When_Password_Not_Includes_A_Digit()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519418877";
        const string password = "Foobar";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Return_An_Error_When_Password_Not_Includes_A_Lowercase_Letter()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519418877";
        const string password = "FOOBAR2@";
        const string passwordConfirmation = "FOOBAR2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Return_An_Error_When_Password_Not_Includes_An_Uppercase_Letter()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519418877";
        const string password = "foobar2@";
        const string passwordConfirmation = "foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Return_An_Error_When_Password_Not_Includes_A_Special_Character()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519418877";
        const string password = "Foobar2";
        const string passwordConfirmation = "Foobar2";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Not_Return_An_Error_When_Password_Is_Valid()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519418877";
        const string password = "Foobar2@";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.Password);
    }

    [Fact]
    public void Should_Return_An_Error_When_PasswordConfirmation_Not_Matches_Password()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519418877";
        const string password = "Foobar2@";
        const string passwordConfirmation = "Foobar2";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldHaveValidationErrorFor(c => c.PasswordConfirmation);
    }

    [Fact]
    public void Should_Return_An_Error_When_PasswordConfirmation_Matches_Password()
    {
        const string username = "marklar";
        const string firstName = "Kyle";
        const string lastName = "Broflowski";
        const string email = "kyle@coons.com";
        const string phoneNumber = "+19519418877";
        const string password = "Foobar2@";
        const string passwordConfirmation = "Foobar2@";
        const string redirectUrl = "/foo/bar";

        var validator = new Register.Validator();

        var command = new Register.Command(username, firstName, lastName, email, phoneNumber,
            password, passwordConfirmation, redirectUrl);

        var result = validator.TestValidate(command);

        result.ShouldNotHaveValidationErrorFor(c => c.PasswordConfirmation);
    }
}