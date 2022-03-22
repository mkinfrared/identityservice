using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Serilog;

namespace IdentityService.Services;

public class LoggingService : ISerivce
{
    public void InstallServices(
        IServiceCollection services,
        IConfiguration configuration,
        IWebHostEnvironment env
    )
    {
        services.AddSingleton(Log.Logger);
    }
}
