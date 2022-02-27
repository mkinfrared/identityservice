using System.ComponentModel.DataAnnotations;

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

        [Required]
        public string UserId { get; }

        [Required]
        public string Token { get; }

        public int? Code { get; }
    }
}
