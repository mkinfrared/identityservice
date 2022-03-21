using System.IO;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web;

using IdentityService.Entities;

using MediatR;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.Web.CodeGeneration;

using NETCore.MailKit.Core;

namespace IdentityService.Features.Auth.ForgotPassword;

public partial class ForgotPassword
{
    public class CommandHandler : IRequestHandler<Command, Task>
    {
        private readonly UserManager<User> _userManager;
        private readonly IFileSystem _fileSystem;
        private readonly IEmailService _emailService;
        private readonly IWebHostEnvironment _hostEnvironment;

        public CommandHandler(
            UserManager<User> userManager,
            IFileSystem fileSystem,
            IEmailService emailService,
            IWebHostEnvironment hostEnvironment
        )
        {
            _userManager = userManager;
            _fileSystem = fileSystem;
            _emailService = emailService;
            _hostEnvironment = hostEnvironment;
        }

        public async Task<Task> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                return Task.CompletedTask;
            }

            var emailConfirmed = await _userManager.IsEmailConfirmedAsync(user);

            if (!emailConfirmed)
            {
                return Task.CompletedTask;
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);

            var query = HttpUtility.ParseQueryString(string.Empty);

            query.Add("userId", user.Id);
            query.Add("token", code);
            query.Add("returnUrl", request.ReturnUrl);

            var url = $"{request.Url}?{query}";
            var emailMessage = GenerateEmailMessage(url);

            await _emailService.SendAsync(request.Email, "Password Reset", emailMessage, true);

            return Task.CompletedTask;
        }

        private string GenerateEmailMessage(string url)
        {
            var root = _hostEnvironment.ContentRootPath;

            var path = Path.Combine(root, "Emails", "PasswordReset.html");

            var text = _fileSystem.ReadAllText(path);

            var message = Regex.Replace(text, "{url}", url);

            return message;
        }
    }
}
