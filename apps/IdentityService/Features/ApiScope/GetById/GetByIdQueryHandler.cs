using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using IdentityServer4.EntityFramework.DbContexts;

using IdentityService.Dto.ApiScope;

using MediatR;

using Microsoft.EntityFrameworkCore;

namespace IdentityService.Features.ApiScope.GetById;

public class GetByIdQueryHandler
    : IRequestHandler<GetByIdQuery, ApiScopeReadDto?>
{
    private readonly ConfigurationDbContext _dbContext;
    private readonly IMapper _mapper;

    public GetByIdQueryHandler(ConfigurationDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<ApiScopeReadDto?> Handle(
        GetByIdQuery? request,
        CancellationToken cancellationToken
    )
    {
        var result = await _dbContext.ApiScopes
            .Include((scope) => scope.UserClaims)
            .FirstOrDefaultAsync((scope) => scope.Id == request.Id);

        if (result != null)
        {
            return _mapper.Map<ApiScopeReadDto>(result);
        }

        return null;
    }
}
