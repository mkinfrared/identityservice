using IdentityService.Dto.ApiScope;

using MediatR;

namespace IdentityService.Features.ApiScope.GetById;

public class GetByIdQuery : IRequest<ApiScopeReadDto?>
{
    public GetByIdQuery(int id)
    {
        Id = id;
    }

    public int Id { get; }
}
