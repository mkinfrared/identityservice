using System.IO;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;
using IdentityService.Services;
using IdentityService.Utils;

using ConfirmEmailCommand = IdentityService.Features.Auth.ConfirmEmail.ConfirmEmail.Command;

using MediatR;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.FileProviders;
using Microsoft.VisualStudio.Web.CodeGeneration;

using NETCore.MailKit.Core;

namespace IdentityService.Features.Auth.Register;

public partial class Register
{
    public class CommandHandler : IRequestHandler<Command, ConfirmEmailCommand?>
    {
        private readonly UserManager<User> _userManager;
        private readonly IEmailService _emailService;
        private readonly CacheService _cache;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IFileSystem _fileSystem;

        public CommandHandler(
            UserManager<User> userManager,
            IEmailService emailService,
            CacheService cache,
            IWebHostEnvironment hostEnvironment,
            IFileSystem fileSystem
        )
        {
            _userManager = userManager;
            _emailService = emailService;
            _cache = cache;
            _hostEnvironment = hostEnvironment;
            _fileSystem = fileSystem;
        }

        public async Task<ConfirmEmailCommand?> Handle(
            Command request, CancellationToken cancellationToken
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

            if (result.Succeeded)
            {
                return await SendEmail(user);
            }

            return null;
        }

        private async Task<ConfirmEmailCommand> SendEmail(User user)
        {
            var subject = "Email Verification";
            var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var code = RandomNumberGenerator.Generate(100000, 999999);

            await _cache.SetRecordAsync(emailToken, code);

            var message = GenerateEmailMessage(user.Email, code);

            await _emailService.SendAsync(user.Email, subject, message, true);

            return new ConfirmEmailCommand(user.Id, emailToken);
        }

        private string GenerateEmailMessage(string emailAddress, int code)
        {
            var root = _hostEnvironment.ContentRootPath;

            var path = Path.Combine(root, "Emails", "RegisterEmail.html");

            var text = _fileSystem.ReadAllText(path);

            var temp = Regex.Replace(text, "{emailAddress}", emailAddress);

            var message = Regex.Replace(temp, "{securityCode}", code.ToString());

            return message;
        }
    }
}
