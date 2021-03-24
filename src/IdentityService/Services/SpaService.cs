// unset

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services
{
    public class SpaService : ISerivce
    {
        public void InstallServices(IServiceCollection service, IConfiguration configuration, IWebHostEnvironment env)
        {
            service.AddSpaStaticFiles(options =>
            {
                // In production, the React files will be served from this directory
                options.RootPath = "client/build";
            });
        }
    }
}
