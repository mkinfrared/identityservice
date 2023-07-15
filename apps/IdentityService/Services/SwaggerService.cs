using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Services;

public class SwaggerService : IService
{
    public void InstallServices(
        IServiceCollection services,
        IConfiguration configuration,
        IWebHostEnvironment env
    )
    {
        services.AddSwaggerGen(options =>
        {
            options.SupportNonNullableReferenceTypes();

            options.CustomSchemaIds(type =>
            {
                var schemaName = type.ToString()
                    .Replace($"{type.Namespace}.", "")
                    .Replace('+', '.');

                return schemaName;
            });
        });
    }
}
