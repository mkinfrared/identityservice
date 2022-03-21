using FluentValidation;

namespace IdentityService.Features.Auth.ForgotPassword;

public partial class ForgotPassword
{
    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.Email).NotEmpty().EmailAddress();

            RuleFor(command => command.Url).NotEmpty();

            RuleFor(command => command.ReturnUrl).NotEmpty();
        }
    }
}
