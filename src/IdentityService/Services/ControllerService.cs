// unset

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services
{
    public class ControllerService : ISerivce
    {
        public void InstallServices(IServiceCollection service, IConfiguration configuration)
        {
            service.AddControllersWithViews();
        }
    }
}
