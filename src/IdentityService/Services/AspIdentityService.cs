using IdentityService.DbContexts;
using IdentityService.Entities;

using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class AspIdentityService : ISerivce
{
  public void InstallServices(IServiceCollection service, IConfiguration configuration,
    IWebHostEnvironment env)
  {
    service.AddIdentity<User, IdentityRole>()
      .AddEntityFrameworkStores<AppDbContext>()
      .AddDefaultTokenProviders();
  }
}
