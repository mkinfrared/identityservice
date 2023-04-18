using System.Threading.Tasks;

using IdentityServer4.Models;
using IdentityServer4.Services;

namespace IdentityService.Services;

public class AppProfileService : IProfileService
{
    public Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var firstName = context.Subject.FindFirst("FirstName");
        var lastName = context.Subject.FindFirst("LastName");

        context.IssuedClaims.Add(firstName);
        context.IssuedClaims.Add(lastName);

        return Task.CompletedTask;
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        context.IsActive = true;

        return Task.CompletedTask;
    }
}
