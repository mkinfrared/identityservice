using System.Reflection;

using MediatR;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services
{
    public class MediatrService : ISerivce
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration,
            IWebHostEnvironment env)
        {
            var assembly = Assembly.GetExecutingAssembly();

            services.AddMediatR(assembly);
        }
    }
}
