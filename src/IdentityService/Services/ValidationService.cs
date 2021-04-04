// unset

using System.Reflection;

using FluentValidation;

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services
{
    public class ValidationService : ISerivce
    {
        public void InstallServices(IServiceCollection services, IConfiguration configuration,
            IWebHostEnvironment env)
        {
            var assembly = Assembly.GetExecutingAssembly();

            services.AddValidatorsFromAssembly(assembly);
        }
    }
}
