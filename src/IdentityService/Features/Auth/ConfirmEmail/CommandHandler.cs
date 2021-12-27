using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;
using IdentityService.Extensions;
using IdentityService.Services;

using MediatR;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Distributed;

namespace IdentityService.Features.Auth.ConfirmEmail;

public partial class ConfirmEmail
{
    public class CommandHandler : IRequestHandler<Command, IdentityResult>
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly CacheService _cache;

        public CommandHandler(UserManager<User> userManager, SignInManager<User> signInManager, CacheService cache)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _cache = cache;
        }

        public async Task<IdentityResult> Handle(Command request,
            CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);
            var actualCode = await _cache.GetRecordAsync<int>(request.Token);

            var isValid = user != null && request.Code != null && request.Code == actualCode;

            if (!isValid)
            {
                var error = new IdentityError();
                error.Description = "Something went wrong. Please try again.";

                return IdentityResult.Failed(error);
            }

            var result = await _userManager.ConfirmEmailAsync(user, request.Token);

            await _signInManager.SignInAsync(user, true);

            return result;
        }
    }
}
