using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.Login
{
    public partial class Login
    {
        public class Command : IRequest<SignInResult>
        {
            public Command(string username, string password, string returnUrl)
            {
                Username = username;
                Password = password;
                ReturnUrl = returnUrl;
            }

            public string Username { get; }
            public string Password { get; }
            public string ReturnUrl { get; }
        }
    }
}
