using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using IdentityServer4.Events;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;

using MediatR;

namespace IdentityService.Features.Consent.SubmitConsent;

public partial class SubmitConsent
{
    public class CommandHandler
        : IRequestHandler<Command, AuthorizationRequest?>
    {
        private readonly IIdentityServerInteractionService _interaction;
        private readonly IEventService _events;

        public CommandHandler(
            IIdentityServerInteractionService interaction,
            IEventService events
        )
        {
            _interaction = interaction;
            _events = events;
        }

        public async Task<AuthorizationRequest?> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var (claimsPrincipal, consent) = request;

            var authorizationRequest =
                await _interaction.GetAuthorizationContextAsync(
                    consent.RedirectUrl
                );

            // validate return url is still valid
            // var request = await _interaction.GetAuthorizationContextAsync(model.ReturnUrl);
            if (authorizationRequest == null)
            {
                return null;
            }

            ConsentResponse? grantedConsent = null;

            if (consent.PermissionGranted)
            {
                var scopes = consent.IdentityScopes
                    .Where(scope => scope.IsPermitted)
                    .Select(scope => scope.Name)
                    .Concat(
                        consent.ApiScopes
                            .Where(scope => scope.IsPermitted)
                            .Select(scope => scope.Name)
                    );

                grantedConsent = new ConsentResponse
                {
                    RememberConsent = consent.RememberConsent,
                    ScopesValuesConsented = scopes.ToArray(),
                    Description = consent.Description
                };

                var consentEvent = new ConsentGrantedEvent(
                    claimsPrincipal.GetSubjectId(),
                    authorizationRequest.Client.ClientId,
                    authorizationRequest.ValidatedResources.RawScopeValues,
                    grantedConsent.ScopesValuesConsented,
                    grantedConsent.RememberConsent
                );

                // emit event
                await _events.RaiseAsync(consentEvent);
            }
            else
            {
                grantedConsent = new ConsentResponse
                {
                    Error = AuthorizationError.AccessDenied
                };

                var consentEvent = new ConsentDeniedEvent(
                    claimsPrincipal.GetSubjectId(),
                    authorizationRequest.Client.ClientId,
                    authorizationRequest.ValidatedResources.RawScopeValues
                );

                // emit event
                await _events.RaiseAsync(consentEvent);
            }

            // communicate outcome of consent back to identityserver
            await _interaction.GrantConsentAsync(
                authorizationRequest,
                grantedConsent
            );

            return authorizationRequest;
        }
    }
}
