using FluentValidation;

using IdentityService.Utils;

namespace IdentityService.Features.Auth.Register;

public partial class Register
{
    public class Validator : AbstractValidator<Command>
    {
        public Validator()
        {
            RuleFor(command => command.Username)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(20)
                .Matches(ValidationRules.Common.NoSpecialCharacters);

            RuleFor(command => command.FirstName)
                .Matches(ValidationRules.Common.HasLetterOrWhiteSpace)
                .MaximumLength(50);

            RuleFor(command => command.LastName)
                .Matches(ValidationRules.Common.HasLetterOrWhiteSpace)
                .MaximumLength(50);

            RuleFor(command => command.Email).NotEmpty().EmailAddress();

            RuleFor(command => command.PhoneNumber).NotEmpty();

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

            RuleFor(command => command.PasswordConfirmation)
                .NotEmpty()
                .Equal(command => command.Password)
                .WithMessage(ValidationRules.Password.ShouldMatchMessage);
        }
    }
}
