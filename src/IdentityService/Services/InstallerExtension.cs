using System;
using System.Linq;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services
{
    public static class InstallerExtension
    {
        public static void InstallServicesInAssembly(this IServiceCollection services,
            IConfiguration configuration)
        {
            var classesImplementingIIstaller = typeof(Startup).Assembly.ExportedTypes
                .Where(installer =>
                {
                    return typeof(ISerivce).IsAssignableFrom(installer) &&
                           !installer.IsInterface && !installer.IsAbstract;
                });

            var installers = classesImplementingIIstaller
                .Select(Activator.CreateInstance)
                .Cast<ISerivce>()
                .ToList();

            installers.ForEach(installer => installer.InstallServices(services, configuration));
        }
    }
}
