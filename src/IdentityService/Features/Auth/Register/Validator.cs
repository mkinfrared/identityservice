using System.Text.RegularExpressions;

using FluentValidation;

namespace IdentityService.Features.Auth.Register
{
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
                    .Matches(new Regex(@"[^*&%#]"));

                RuleFor(command => command.FirstName)
                    .Matches(new Regex(@"[\w\s-]"))
                    .MaximumLength(50);

                RuleFor(command => command.LastName)
                    .Matches(new Regex(@"[\w\s-]"))
                    .MaximumLength(50);

                RuleFor(command => command.Email)
                    .NotEmpty()
                    .EmailAddress();

                RuleFor(command => command.PhoneNumber)
                    .NotEmpty();

                RuleFor(command => command.Password)
                    .NotEmpty()
                    .Matches(new Regex(@"\d")).WithMessage("Password should contain a digit")
                    .Matches(new Regex(@"[a-z]"))
                    .WithMessage("Password should contain a lowercase letter")
                    .Matches(new Regex(@"[A-Z]"))
                    .WithMessage("Password should contain an uppercase letter")
                    .Matches(new Regex(@"[!@#$%^&*()-+={}]"))
                    .WithMessage("Password should contain a special character")
                    .Equal(command => command.PasswordConfirmation)
                    .WithMessage("Passwords should match");

                RuleFor(command => command.PasswordConfirmation)
                    .NotEmpty()
                    .Equal(command => command.Password).WithMessage("Passwords should match");
            }
        }
    }
}
