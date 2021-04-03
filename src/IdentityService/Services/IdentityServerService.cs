using System;
using System.Reflection;

using IdentityService.Entities;

using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services
{
    public class IdentityServerService : ISerivce
    {
        public void InstallServices(IServiceCollection service, IConfiguration configuration,
            IWebHostEnvironment env)
        {
            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;
            var connectionString = configuration.GetValue<string>("Postgres");

            var builder = service.AddIdentityServer(options =>
                {
                    options.UserInteraction.LoginUrl = "https://localhost:10001/login";
                    options.UserInteraction.ErrorUrl = "https://localhost:10001/error";
                    options.UserInteraction.ConsentUrl = "https://localhost:10001/consent";
                    options.UserInteraction.LogoutUrl = "https://localhost:10001/logout";

                    options.UserInteraction.DeviceVerificationUrl =
                        "https://localhost:10001/device-verification";

                    options.Authentication.CookieLifetime = TimeSpan.FromDays(30);
                    options.Authentication.CookieSlidingExpiration = true;
                })
                .AddAspNetIdentity<User>()
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                        builder.UseNpgsql(connectionString,
                            optionsBuilder =>
                                optionsBuilder.MigrationsAssembly(migrationsAssembly));
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = builder =>
                        builder.UseNpgsql(connectionString, optionsBuilder =>
                            optionsBuilder.MigrationsAssembly(migrationsAssembly));

                    // this enables automatic token cleanup. this is optional.
                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 3600; // interval in seconds (default is 3600)
                });

            builder.AddDeveloperSigningCredential();
        }
    }
}
