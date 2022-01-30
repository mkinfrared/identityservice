using FluentValidation;

namespace IdentityService.Features.Auth.Login;

public partial class Login
{
  public class Validator : AbstractValidator<Command>
  {
    public Validator()
    {
      RuleFor(command => command.Username)
        .NotEmpty();

      RuleFor(command => command.Password)
        .NotEmpty();

      RuleFor(command => command.ReturnUrl)
        .NotEmpty();
    }
  }
}
