using FluentValidation;

namespace IdentityService.Features.Auth.ConfirmEmail;

public partial class ConfirmEmail
{
    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.UserId)
                .NotEmpty();

            RuleFor(command => command.Token)
                .NotEmpty();
        }
    }
}
