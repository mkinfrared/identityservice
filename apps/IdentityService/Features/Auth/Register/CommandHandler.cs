using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;

using MediatR;

using Microsoft.AspNetCore.Identity;

namespace IdentityService.Features.Auth.Register;

public partial class Register
{
    public class CommandHandler : IRequestHandler<Command, IdentityResult>
    {
        private readonly UserManager<User> _userManager;

        public CommandHandler(UserManager<User> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityResult> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            var user = new User
            {
                UserName = request.Username,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            return result;
        }
    }
}
