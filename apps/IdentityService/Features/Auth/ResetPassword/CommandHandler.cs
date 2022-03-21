using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;

using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.ResetPassword;

public partial class ResetPassword
{
    public class CommandHandler : IRequestHandler<Command, IdentityResult?>
    {
        private readonly UserManager<User> _userManager;

        public CommandHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult?> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var (userId, token, password) = request;

            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                var error = new IdentityError();
                error.Description = "UserId is not valid";

                return IdentityResult.Failed(error);
            }

            var result = await _userManager.ResetPasswordAsync(user, token, password);

            return result;
        }
    }
}
