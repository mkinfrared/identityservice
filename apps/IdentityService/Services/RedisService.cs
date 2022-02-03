using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class RedisService : ISerivce
{
  public void InstallServices(
    IServiceCollection service,
    IConfiguration configuration,
    IWebHostEnvironment env
  )
  {
    service.AddStackExchangeRedisCache(
      options =>
      {
        var connection = configuration.GetConnectionString("Redis");
        var instanceName = "IdentityService_";

        options.Configuration = connection;
        options.InstanceName = instanceName;
      }
    );
  }
}
