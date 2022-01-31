using System;

using IdentityService.DbContexts;

using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class DbService : ISerivce
{
  public void InstallServices(IServiceCollection service, IConfiguration configuration,
    IWebHostEnvironment env)
  {
    var connectionString = configuration.GetConnectionString("Postgres");

    /**
         * https://stackoverflow.com/questions/69961449/net6-and-datetime-problem-cannot-write-datetime-with-kind-utc-to-postgresql-ty
         * https://github.com/npgsql/doc/blob/main/conceptual/Npgsql/types/datetime.md/
         */
    AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

    service.AddDbContext<AppDbContext>(builder =>
    {
      builder.UseNpgsql(connectionString);
    });
  }
}
