using IdentityService.DbContexts;

using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class DbService : IService
{
    public void InstallServices(
        IServiceCollection service,
        IConfiguration configuration,
        IWebHostEnvironment env
    )
    {
        var connectionString = configuration.GetConnectionString("Postgres");

        service.AddDbContext<AppDbContext>(builder =>
        {
            builder.UseNpgsql(connectionString);
        });
    }
}
