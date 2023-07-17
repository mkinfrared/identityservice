using FluentValidation;

namespace IdentityService.Features.ApiScope.CreateApiScope;

public class Validator : AbstractValidator<Command>
{
    public Validator()
    {
        RuleFor(command => command.Name).NotNull().NotEmpty();
    }
}
