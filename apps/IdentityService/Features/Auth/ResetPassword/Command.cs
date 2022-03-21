using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.ResetPassword;

public partial class ResetPassword
{
    public class Command : IRequest<IdentityResult?>
    {
        public Command(string userId, string token, string password, string confirmPassword)
        {
            UserId = userId;
            Token = token;
            Password = password;
            ConfirmPassword = confirmPassword;
        }

        public string UserId { get; }
        public string Token { get; }
        public string Password { get; }
        public string ConfirmPassword { get; }

        public void Deconstruct(out string userId, out string token, out string password)
        {
            userId = UserId;
            token = Token;
            password = Password;
        }
    }
}
