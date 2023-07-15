using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public interface IService
{
    void InstallServices(
        IServiceCollection serviceCollection,
        IConfiguration configuration,
        IWebHostEnvironment env
    );
}
