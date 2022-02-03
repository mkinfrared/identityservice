using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class HttpContextAccessorService : ISerivce
{
  public void InstallServices(
    IServiceCollection service,
    IConfiguration configuration,
    IWebHostEnvironment env
  )
  {
    // service.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
  }
}
