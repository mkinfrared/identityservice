using FluentValidation;

using IdentityService.Utils;

namespace IdentityService.Features.Auth.ResetPassword;

public partial class ResetPassword
{
    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.Password)
                .NotEmpty()
                .Matches(ValidationRules.Password.ContainsDigit)
                .WithMessage(ValidationRules.Password.NotContainsDigitMessage)
                .Matches(ValidationRules.Password.ContainsLowercaseLetter)
                .WithMessage(ValidationRules.Password.NotContainsLowerCaseMessage)
                .Matches(ValidationRules.Password.ContainsUppercaseLetter)
                .WithMessage(ValidationRules.Password.NotContainsUpperCaseMessage)
                .Matches(ValidationRules.Password.ContainsSpecialCharacter)
                .WithMessage(ValidationRules.Password.NotContainsSpecialCharacterMessage);

            RuleFor(command => command.ConfirmPassword)
                .NotEmpty()
                .Equal(command => command.Password)
                .WithMessage(ValidationRules.Password.ShouldMatchMessage);

            RuleFor(command => command.Token).NotEmpty();

            RuleFor(command => command.UserId).NotEmpty();
        }
    }
}
