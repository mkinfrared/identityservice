using System;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.Extensions.Caching.Distributed;

namespace IdentityService.Extensions;

public static class DistributedClassExtensions
{
  public static async Task SetRecordAsync<T>(
    this IDistributedCache cache,
    string key,
    T data,
    TimeSpan? absoluteExpireTime = null,
    TimeSpan? slidingExpiration = null
  )
  {
    var options = new DistributedCacheEntryOptions();

    options.AbsoluteExpirationRelativeToNow = absoluteExpireTime ?? TimeSpan.FromMinutes(60);
    options.SlidingExpiration = slidingExpiration;

    var jsonData = JsonSerializer.Serialize(data);

    await cache.SetStringAsync(key, jsonData, options);
  }

  public static async Task<T?> GetRecordAsync<T>(this IDistributedCache cache, string key)
  {
    var data = await cache.GetStringAsync(key);

    if (data is null)
    {
      return default;
    }

    var jsonData = JsonSerializer.Deserialize<T>(data);

    return jsonData;
  }
}
