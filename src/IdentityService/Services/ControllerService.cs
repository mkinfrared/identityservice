using FluentValidation.AspNetCore;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class ControllerService : ISerivce
{
    public void InstallServices(IServiceCollection service, IConfiguration configuration,
        IWebHostEnvironment env)
    {
        service.AddControllersWithViews()
            .AddFluentValidation(mvcConfiguration =>
            {
                mvcConfiguration.RegisterValidatorsFromAssemblyContaining<Startup>();
                mvcConfiguration.LocalizationEnabled = false;
            })
            .AddNewtonsoftJson();
    }
}