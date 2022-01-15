using System.Text.RegularExpressions;

using FluentValidation;

namespace IdentityService.Features.Auth.Register;

public partial class Register
{
    public class Validator : AbstractValidator<Command>
    {
        private static readonly Regex NoSpecialCharacters =
            new(@"^[A-z0-9]*$", RegexOptions.Compiled);

        private static readonly Regex HasLetterOrWhiteSpace =
            new(@"^[A-z\s-]*$", RegexOptions.Compiled);

        private static readonly Regex ContainsDigit = new(@"\d", RegexOptions.Compiled);

        private static readonly Regex ContainsLowercaseLetter =
            new(@"[a-z]", RegexOptions.Compiled);

        private static readonly Regex ContainsUppercaseLetter =
            new(@"[A-Z]", RegexOptions.Compiled);

        private static readonly Regex ContainsSpecialCharacter =
            new(@"[!@#$%^&*()-+={}]", RegexOptions.Compiled);

        private static readonly string NotContainsDigitMessage = "Password should contain a digit";

        private static readonly string NotContainsLowerCaseMessage =
            "Password should contain a lowercase letter";

        private static readonly string NotContainsUpperCaseMessage =
            "Password should contain an uppercase letter";

        private static readonly string NotContainsSpecialCharacterMessage =
            "Password should contain a special character";

        private static readonly string ShouldMatchMessage = "Passwords should match";

        public Validator()
        {
            RuleFor(command => command.Username)
                .NotEmpty()
                .MinimumLength(3)
                .MaximumLength(20)
                .Matches(NoSpecialCharacters);

            RuleFor(command => command.FirstName)
                .Matches(HasLetterOrWhiteSpace)
                .MaximumLength(50);

            RuleFor(command => command.LastName)
                .Matches(HasLetterOrWhiteSpace)
                .MaximumLength(50);

            RuleFor(command => command.Email)
                .NotEmpty()
                .EmailAddress();

            RuleFor(command => command.PhoneNumber)
                .NotEmpty();

            RuleFor(command => command.Password)
                .NotEmpty()
                .Matches(ContainsDigit)
                .WithMessage(NotContainsDigitMessage)
                .Matches(ContainsLowercaseLetter)
                .WithMessage(NotContainsLowerCaseMessage)
                .Matches(ContainsUppercaseLetter)
                .WithMessage(NotContainsUpperCaseMessage)
                .Matches(ContainsSpecialCharacter)
                .WithMessage(NotContainsSpecialCharacterMessage);

            RuleFor(command => command.PasswordConfirmation)
                .NotEmpty()
                .Equal(command => command.Password).WithMessage(ShouldMatchMessage);
        }
    }
}