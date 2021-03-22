// unset

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services
{
    public class SpaService : ISerivce
    {
        public void InstallServices(IServiceCollection service, IConfiguration configuration)
        {
            service.AddSpaStaticFiles(options =>
            {
                // In production, the React files will be served from this directory
                options.RootPath = "client/build";
            });
        }
    }
}
