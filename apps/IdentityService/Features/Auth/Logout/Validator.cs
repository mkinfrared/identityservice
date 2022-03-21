using FluentValidation;

namespace IdentityService.Features.Auth.Logout;

public partial class Logout
{
    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.LogoutId).NotEmpty();
        }
    }
}
