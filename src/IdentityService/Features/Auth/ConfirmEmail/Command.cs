using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.ConfirmEmail;

public partial class ConfirmEmail
{
    public class Command : IRequest<IdentityResult>
    {
        public Command(string userId, string token, int? code = null)
        {
            UserId = userId;
            Token = token;
            Code = code;
        }

        public string UserId { get; }
        public string Token { get; }
        public int? Code { get; }
    }
}
