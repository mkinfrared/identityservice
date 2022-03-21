using FluentValidation;

namespace IdentityService.Features.Auth.SendConfirmEmail;

public partial class SendConfirmEmail
{
    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.Username).NotEmpty();
        }
    }
}
