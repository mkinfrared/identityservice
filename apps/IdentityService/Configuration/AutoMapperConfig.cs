using System.Linq;

using AutoMapper;

using IdentityServer4.EntityFramework.Entities;

using IdentityService.Dto.ApiScope;
using IdentityService.Features.ApiScope.CreateApiScope;

namespace IdentityService.Configuration;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<ApiScope, ApiScopeReadDto>()
            .ForMember(
                (dest) => dest.UserClaims,
                (opt) =>
                    opt.MapFrom(
                        (src) => src.UserClaims.Select((claim) => claim.Type)
                    )
            );

        CreateMap<CreateApiScope.Command, ApiScope>()
            .ForMember(
                dest => dest.UserClaims,
                opt =>
                {
                    opt.MapFrom(
                        src =>
                            src.UserClaims.Select(
                                claim => new ApiScopeClaim { Type = claim }
                            )
                    );
                }
            );
    }
}
