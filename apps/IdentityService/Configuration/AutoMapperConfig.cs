using System.Linq;

using AutoMapper;

using Is4Entity = IdentityServer4.EntityFramework.Entities;

using IdentityService.Dto.ApiScope;
using IdentityService.Utils;

using ApiScope = IdentityService.Features.ApiScope;

namespace IdentityService.Configuration;

public class AutoMapperConfig : Profile
{
    public AutoMapperConfig()
    {
        CreateMap<Is4Entity.ApiScope, ApiScopeReadDto>()
            .ForMember(
                (dest) => dest.UserClaims,
                (opt) =>
                    opt.MapFrom(
                        (src) => src.UserClaims.Select((claim) => claim.Type)
                    )
            );

        CreateMap<ApiScope.CreateApiScope.Command, Is4Entity.ApiScope>()
            .ForMember(
                dest => dest.UserClaims,
                opt =>
                {
                    opt.MapFrom(
                        src =>
                            src.UserClaims.Select(
                                claim =>
                                    new Is4Entity.ApiScopeClaim()
                                    {
                                        Type = claim
                                    }
                            )
                    );
                }
            );

        CreateMap(typeof(PaginatedList<>), typeof(PaginatedList<>))
            .ConvertUsing(typeof(PaginatedListConverter<,>));
    }
}
