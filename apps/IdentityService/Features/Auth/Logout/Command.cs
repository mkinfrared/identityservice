using MediatR;

namespace IdentityService.Features.Auth.Logout;

public partial class Logout
{
  public class Command : IRequest<string>
  {
    public Command(string logoutId)
    {
      LogoutId = logoutId;
    }

    public string LogoutId { get; }
  }
}
