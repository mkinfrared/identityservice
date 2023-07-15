using System.Security.Principal;

using IdentityServer4.Models;

using IdentityService.Dto.Consent;

using MediatR;

namespace IdentityService.Features.Consent.SubmitConsent;

public partial class SubmitConsent
{
    public class Command : IRequest<AuthorizationRequest?>
    {
        public Command(ConsentUpdateDto consent, IPrincipal user)
        {
            User = user;
            Consent = consent;
        }

        public IPrincipal User { get; }

        public ConsentUpdateDto Consent { get; }

        public void Deconstruct(
            out IPrincipal user,
            out ConsentUpdateDto consent
        )
        {
            user = User;
            consent = Consent;
        }
    }
}
