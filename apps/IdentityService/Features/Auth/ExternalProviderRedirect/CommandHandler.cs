using System.Threading;
using System.Threading.Tasks;

using IdentityService.Dto;
using IdentityService.Entities;

using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.ExternalProviderRedirect;

public partial class ExternalProviderRedirect
{
    public class CommandHandler : IRequestHandler<Command, ExternalRegisterDto>
    {
        private readonly SignInManager<User> _signInManager;

        public CommandHandler(SignInManager<User> signInManager)
        {
            _signInManager = signInManager;
        }

        public Task<ExternalRegisterDto> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var currentProvider = request.Provider.ToString();
            var properties =
                _signInManager.ConfigureExternalAuthenticationProperties(
                    currentProvider,
                    request.RedirectUri
                );

            var result = new ExternalRegisterDto();
            result.Properties = properties;
            result.Provider = currentProvider;

            return Task.Run(() => result);
        }
    }
}
