using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.Register
{
    public partial class Register
    {
        public class Command : IRequest<IdentityResult>
        {
            public Command(string username, string firstName, string lastName, string email,
                string phoneNumber, string password, string passwordConfirmation, string redirectUrl)
            {
                Username = username;
                FirstName = firstName;
                LastName = lastName;
                Email = email;
                PhoneNumber = phoneNumber;
                Password = password;
                PasswordConfirmation = passwordConfirmation;
                RedirectUrl = redirectUrl;
            }

            public string Username { get; }
            public string FirstName { get; }
            public string LastName { get; }
            public string Email { get; }
            public string PhoneNumber { get; }
            public string Password { get; }
            public string PasswordConfirmation { get; }
            public string RedirectUrl { get; }
        }
    }
}
