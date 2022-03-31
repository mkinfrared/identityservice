using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.ExternalProviderRegister;

public partial class ExternalProviderRegister
{
    public class Command : IRequest<IdentityResult>
    {
        public Command(string redirectUrl)
        {
            RedirectUrl = redirectUrl;
        }

        public string RedirectUrl { get; }
    }
}
