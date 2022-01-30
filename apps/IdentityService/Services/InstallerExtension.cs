using System;
using System.Linq;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public static class InstallerExtension
{
  public static void InstallServicesInAssembly(this IServiceCollection services,
    IConfiguration configuration, IWebHostEnvironment env)
  {
    var classesImplementingIInstaller = typeof(Startup).Assembly.ExportedTypes
      .Where(installer =>
      {
        return typeof(ISerivce).IsAssignableFrom(installer) &&
               !installer.IsInterface && !installer.IsAbstract;
      });

    var installers = classesImplementingIInstaller
      .Select(Activator.CreateInstance)
      .Cast<ISerivce>()
      .ToList();

    installers.ForEach(installer =>
      installer.InstallServices(services, configuration, env));
  }
}
