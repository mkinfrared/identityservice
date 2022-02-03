using System.Threading;
using System.Threading.Tasks;

using IdentityServer4.Services;

using IdentityService.Entities;

using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.Logout;

public partial class Logout
{
  public class CommandHandler : IRequestHandler<Command, string>
  {
    private readonly SignInManager<User> _signInManager;
    private readonly IIdentityServerInteractionService _interactionService;

    public CommandHandler(
      SignInManager<User> signInManager,
      IIdentityServerInteractionService interactionService
    )
    {
      _signInManager = signInManager;
      _interactionService = interactionService;
    }

    public async Task<string> Handle(Command request, CancellationToken cancellationToken)
    {
      await _signInManager.SignOutAsync();

      var logoutRequest = await _interactionService.GetLogoutContextAsync(request.LogoutId);

      return logoutRequest.PostLogoutRedirectUri;
    }
  }
}
