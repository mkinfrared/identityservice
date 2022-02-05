using System.IO;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;

using IdentityService.Entities;
using IdentityService.Services;
using IdentityService.Utils;

using MediatR;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.VisualStudio.Web.CodeGeneration;

using NETCore.MailKit.Core;

using ConfirmEmailCommand = IdentityService.Features.Auth.ConfirmEmail.ConfirmEmail.Command;

namespace IdentityService.Features.Auth.SendConfirmEmail;

public partial class SendConfirmEmail
{
  public class CommandHandler : IRequestHandler<Command, ConfirmEmailCommand>
  {
    private readonly CacheService _cache;
    private readonly IFileSystem _fileSystem;
    private readonly IEmailService _emailService;
    private readonly IWebHostEnvironment _hostEnvironment;
    private readonly UserManager<User> _userManager;

    public CommandHandler(UserManager<User> userManager, CacheService cache, IFileSystem fileSystem,
      IEmailService emailService, IWebHostEnvironment hostEnvironment)
    {
      _userManager = userManager;
      _cache = cache;
      _fileSystem = fileSystem;
      _emailService = emailService;
      _hostEnvironment = hostEnvironment;
    }

    public async Task<ConfirmEmailCommand> Handle(Command request,
      CancellationToken cancellationToken)
    {
      var subject = "Email Verification";
      var user = await _userManager.FindByNameAsync(request.Username);
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
