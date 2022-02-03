using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.VisualStudio.Web.CodeGeneration;

namespace IdentityService.Services;

public class FileSystemService : ISerivce
{
  public void InstallServices(
    IServiceCollection services,
    IConfiguration configuration,
    IWebHostEnvironment env
  )
  {
    services.AddScoped<IFileSystem, DefaultFileSystem>();
  }
}
