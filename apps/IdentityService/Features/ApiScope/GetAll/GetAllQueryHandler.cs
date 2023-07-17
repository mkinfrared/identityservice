using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using IdentityServer4.EntityFramework.DbContexts;

using Is4Entities = IdentityServer4.EntityFramework.Entities;

using IdentityService.Dto.ApiScope;
using IdentityService.Utils;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace IdentityService.Features.ApiScope.GetAll;

public class GetAllQueryHandler
    : IRequestHandler<GetAllQuery, PaginatedList<ApiScopeReadDto>>
{
    private readonly ConfigurationDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetAllQueryHandler(ConfigurationDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<PaginatedList<ApiScopeReadDto>> Handle(
        GetAllQuery request,
        CancellationToken cancellationToken
    )
    {
        var scopeQuery = _dbContext.ApiScopes
            .AsQueryable()
            .Include((scope) => scope.UserClaims)
            .Where(
                scope =>
                    // csharpier-ignore-start
                    // string filters
                    // string filters
                    EF.Functions.ILike(scope.Name, $"%{request.Name ?? ""}%")
                    && EF.Functions.ILike(
                        scope.DisplayName,
                        $"%{request.DisplayName ?? ""}%"
                    )
                    && EF.Functions.ILike(
                        scope.Description,
                        $"%{request.Description ?? ""}%"
                    )
                    &&
                    // boolean filters
                    (
                        !request.Enabled.HasValue
                        || scope.Enabled == request.Enabled
                    )
                    && (
                        !request.Emphasize.HasValue
                        || scope.Emphasize == request.Emphasize
                    )
                    && (
                        !request.Required.HasValue
                        || scope.Required == request.Required
                    )
                    && (
                        !request.ShowInDiscoveryDocument.HasValue
                        || scope.ShowInDiscoveryDocument
                            == request.ShowInDiscoveryDocument
                    )
            // csharpier-ignore-end
            );

        // array of strings
        if (request.UserClaims != null && request.UserClaims.Count > 0)
        {
            scopeQuery = scopeQuery.Where(
                scope =>
                    scope.UserClaims.Any(
                        claim =>
                            request.UserClaims.Any(
                                userClaim =>
                                    EF.Functions.ILike(claim.Type, userClaim)
                            )
                    )
            );
        }

        var list = await PaginatedList<Is4Entities.ApiScope>.CreateAsync(
            scopeQuery,
            request.Page,
            request.PageSize
        );

        var result = _mapper.Map<PaginatedList<ApiScopeReadDto>>(list);

        return result;
    }
}
