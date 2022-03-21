using System.Threading.Tasks;

using MediatR;

namespace IdentityService.Features.Auth.ForgotPassword;

public partial class ForgotPassword
{
    public class Command : IRequest<Task>
    {
        public Command(string email, string returnUrl, string url)
        {
            Email = email;
            Url = url;
            ReturnUrl = returnUrl;
        }

        public string Email { get; }
        public string ReturnUrl { get; }
        public string Url { get; }
    }
}
