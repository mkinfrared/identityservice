using System.ComponentModel.DataAnnotations;

using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.Login;

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

        [Required]
        public string Username { get; }

        [Required]
        public string Password { get; }

        [Required]
        public string ReturnUrl { get; }
    }
}
