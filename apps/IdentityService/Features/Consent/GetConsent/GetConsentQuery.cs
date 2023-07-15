using IdentityService.Dto.Consent;

using MediatR;

namespace IdentityService.Features.Consent.GetConsent;

public partial class Consent
{
    public class GetConsentQuery : IRequest<ConsentReadDto?>
    {
        public GetConsentQuery(string returnUrl)
        {
            ReturnUrl = returnUrl;
        }

        public string ReturnUrl { get; }
    }
}
