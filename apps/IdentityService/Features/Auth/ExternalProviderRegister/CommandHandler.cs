using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;

using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.ExternalProviderRegister;

public partial class ExternalProviderRegister
{
    public class CommandHandler : IRequestHandler<Command, IdentityResult>
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public CommandHandler(
            SignInManager<User> signInManager,
            UserManager<User> userManager
        )
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<IdentityResult> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var info = await _signInManager.GetExternalLoginInfoAsync();

            if (info == null)
            {
                var error = new IdentityError();
                error.Description = "Failed to get external login info";

                return IdentityResult.Failed(error);
            }

            var signInResult = await _signInManager.ExternalLoginSignInAsync(
                info.LoginProvider,
                info.ProviderKey,
                true
            );

            // redirect to authentication returnUrl since everything succeeded
            // the user is already stored in db?
            if (signInResult.Succeeded)
            {
                return IdentityResult.Success;
            }

            // otherwise register user with info provided from principals
            // principal.username, principal.firstName etc
            var username = info.Principal?.FindFirst(ClaimTypes.Name)?.Value;
            var email = info.Principal?.FindFirst(ClaimTypes.Email)?.Value;
            var firstName = info.Principal
                ?.FindFirst(ClaimTypes.GivenName)
                ?.Value;
            var lastName = info.Principal?.FindFirst(ClaimTypes.Surname)?.Value;

            var user = new User();
            user.UserName = username?.Replace(" ", "");
            user.Email = email;
            user.FirstName = firstName;
            user.LastName = lastName;

            var createResult = await _userManager.CreateAsync(user);

            if (!createResult.Succeeded)
            {
                return createResult;
            }

            var loginResult = await _userManager.AddLoginAsync(user, info);

            if (!loginResult.Succeeded)
            {
                return loginResult;
            }

            await _signInManager.SignInAsync(user, true);

            return IdentityResult.Success;
        }
    }
}
