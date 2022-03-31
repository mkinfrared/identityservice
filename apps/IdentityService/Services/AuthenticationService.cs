using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class AuthenticationService : ISerivce
{
    public void InstallServices(
        IServiceCollection service,
        IConfiguration configuration,
        IWebHostEnvironment env
    )
    {
        service
            .AddAuthentication()
            .AddGoogle(
                options =>
                {
                    options.ClientId = configuration["Authentication:Google:ClientId"];
                    options.ClientSecret = configuration["Authentication:Google:ClientSecret"];
                }
            );
    }
}
