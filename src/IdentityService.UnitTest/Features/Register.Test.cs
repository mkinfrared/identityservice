using IdentityService.Features.Auth.Register;

using Xunit;

namespace IdentityService.Unit.Features
{
    public class RegisterTest
    {
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
    }
}
