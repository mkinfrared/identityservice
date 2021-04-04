using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;

using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.Login
{
    public partial class Login
    {
        public class CommandHandler : IRequestHandler<Command, SignInResult>
        {
            private readonly SignInManager<User> _signInManager;
            private readonly UserManager<User> _userManager;

            public CommandHandler(UserManager<User> userManager, SignInManager<User> signInManager)
            {
                _userManager = userManager;
                _signInManager = signInManager;
            }

            public async Task<SignInResult> Handle(Command request,
                CancellationToken cancellationToken)
            {
                var user = await _userManager.FindByNameAsync(request.Username);

                if (user == null)
                {
                    return SignInResult.Failed;
                }

                var signInResult = await
                    _signInManager.PasswordSignInAsync(user, request.Password, true, false);

                return signInResult;
            }
        }
    }
}
