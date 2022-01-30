using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using NETCore.MailKit.Extensions;
using NETCore.MailKit.Infrastructure.Internal;

namespace IdentityService.Services;

public class MailKitService : ISerivce
{
  public void InstallServices(IServiceCollection services, IConfiguration configuration,
    IWebHostEnvironment env)
  {
    var options = configuration.GetSection("Email").Get<MailKitOptions>();

    services.AddMailKit(config =>
      config.UseMailKit(options));
  }
}
