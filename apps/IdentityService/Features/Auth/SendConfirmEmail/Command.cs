using MediatR;

using ConfirmEmailCommand = IdentityService.Features.Auth.ConfirmEmail.ConfirmEmail.Command;

namespace IdentityService.Features.Auth.SendConfirmEmail;

public partial class SendConfirmEmail
{
  public class Command : IRequest<ConfirmEmailCommand>
  {
    public Command(string username)
    {
      Username = username;
    }

    public string Username { get; }
  }
}
