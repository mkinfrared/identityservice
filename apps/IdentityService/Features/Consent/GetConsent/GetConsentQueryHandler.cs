using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using IdentityServer4.Models;
using IdentityServer4.Services;
using IdentityServer4.Validation;

using IdentityService.Dto.ApiScope;
using IdentityService.Dto.Consent;

using MediatR;

namespace IdentityService.Features.Consent.GetConsent;

partial class Consent
{
    public class GetConsentQueryHandler
        : IRequestHandler<GetConsentQuery, ConsentReadDto?>
    {
        private readonly IIdentityServerInteractionService _interaction;

        public GetConsentQueryHandler(
            IIdentityServerInteractionService interaction
        )
        {
            _interaction = interaction;
        }

        public async Task<ConsentReadDto?> Handle(
            GetConsentQuery request,
            CancellationToken cancellationToken
        )
        {
            var autorizationContext =
                await _interaction.GetAuthorizationContextAsync(
                    request.ReturnUrl
                );

            if (autorizationContext == null)
            {
                return null;
            }

            return CreateConsent(autorizationContext, request.ReturnUrl);
        }

        private ConsentReadDto CreateConsent(
            AuthorizationRequest request,
            string returnUrl
        )
        {
            var consent = new ConsentReadDto
            {
                AllowRememberConsent = request.Client.AllowRememberConsent,
                ClientName =
                    request.Client.ClientName ?? request.Client.ClientId,
                ClientUrl = request.Client.ClientUri,
                ClientLogoUrl = request.Client.LogoUri,
                ReturnUrl = returnUrl
            };

            consent.IdentityScopes =
                request.ValidatedResources.Resources.IdentityResources
                    .Select(x => CreateApiScope(x))
                    .ToArray();

            var apiScopes = new List<ApiScopeReadDto>();

            foreach (var parsedScope in request.ValidatedResources.ParsedScopes)
            {
                var apiScope =
                    request.ValidatedResources.Resources.FindApiScope(
                        parsedScope.ParsedName
                    );

                if (apiScope != null)
                {
                    var scope = CreateApiScope(parsedScope, apiScope);
                    apiScopes.Add(scope);
                }
            }

            consent.ApiScopes = apiScopes;

            return consent;
        }

        private ApiScopeReadDto CreateApiScope(IdentityResource identity)
        {
            return new ApiScopeReadDto
            {
                Name = identity.Name,
                DisplayName = identity.DisplayName ?? identity.Name,
                Description = identity.Description,
                Emphasize = identity.Emphasize,
                Required = identity.Required
            };
        }

        public ApiScopeReadDto CreateApiScope(
            ParsedScopeValue parsedScopeValue,
            IdentityServer4.Models.ApiScope apiScope
        )
        {
            var displayName = apiScope.DisplayName ?? apiScope.Name;

            if (!string.IsNullOrWhiteSpace(parsedScopeValue.ParsedParameter))
            {
                displayName += ":" + parsedScopeValue.ParsedParameter;
            }

            return new ApiScopeReadDto
            {
                Name = parsedScopeValue.RawValue,
                DisplayName = displayName,
                Description = apiScope.Description,
                Emphasize = apiScope.Emphasize,
                Required = apiScope.Required
            };
        }
    }
}
