using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class CorsService : ISerivce
{
    public void InstallServices(
        IServiceCollection service,
        IConfiguration configuration,
        IWebHostEnvironment env
    )
    {
        var origins = configuration.GetSection("Cors:Origins").Get<string[]>();

        service.AddCors(
            options =>
            {
                options.AddPolicy(
                    "SafeOrigins",
                    builder =>
                    {
                        builder.WithOrigins(origins);
                        builder.AllowAnyHeader();
                        builder.AllowAnyMethod();
                        builder.AllowCredentials();
                    }
                );
            }
        );
    }
}
