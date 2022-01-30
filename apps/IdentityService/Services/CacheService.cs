using System.Threading.Tasks;

using IdentityService.Extensions;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class CacheService
{
  private readonly IDistributedCache _cache;

  public CacheService(IDistributedCache cache)
  {
    _cache = cache;
  }

  public virtual Task SetRecordAsync<T>(string key, T data)
  {
    return _cache.SetRecordAsync(key, data);
  }

  public virtual Task<T?> GetRecordAsync<T>(string key)
  {
    return _cache.GetRecordAsync<T>(key);
  }
}

public class CacheServiceInstaller : ISerivce
{
  public void InstallServices(IServiceCollection services, IConfiguration configuration,
    IWebHostEnvironment env)
  {
    services.AddSingleton<CacheService>();
  }
}
