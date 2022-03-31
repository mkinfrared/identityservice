using System.Runtime.Serialization;

using IdentityService.Dto;

using MediatR;

using Microsoft.AspNetCore.Authentication.Google;

using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace IdentityService.Features.Auth.ExternalProviderRedirect;

[JsonConverter(typeof(StringEnumConverter))]
public enum Providers
{
    [EnumMember(Value = GoogleDefaults.AuthenticationScheme)]
    Google,
}

public partial class ExternalProviderRedirect
{
    public class Command : IRequest<ExternalRegisterDto>
    {
        public Command(Providers provider, string redirectUri)
        {
            Provider = provider;
            RedirectUri = redirectUri;
        }

        public Providers Provider { get; }
        public string RedirectUri { get; }
    }
}
