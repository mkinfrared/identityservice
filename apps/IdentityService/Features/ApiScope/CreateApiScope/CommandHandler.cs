using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using IdentityServer4.EntityFramework.DbContexts;

using IdentityService.Dto.ApiScope;

using MediatR;

namespace IdentityService.Features.ApiScope.CreateApiScope;

public class CommandHandler : IRequestHandler<Command, ApiScopeReadDto?>
{
    private readonly ConfigurationDbContext _dbContext;
    private readonly IMapper _mapper;

    public CommandHandler(ConfigurationDbContext dbContext, IMapper mapper)
    {
        _dbContext = dbContext;
        _mapper = mapper;
    }

    public async Task<ApiScopeReadDto?> Handle(
        Command request,
        CancellationToken cancellationToken
    )
    {
        var apiScope =
            _mapper.Map<IdentityServer4.EntityFramework.Entities.ApiScope>(
                request
            );

        var result = await _dbContext.ApiScopes.AddAsync(apiScope);

        await _dbContext.SaveChangesAsync();

        var dto = _mapper.Map<ApiScopeReadDto>(result.Entity);

        return dto;
    }
}
