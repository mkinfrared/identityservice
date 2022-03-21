// unset

using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

using IdentityServer4.Models;
using IdentityServer4.Validation;

using IdentityService.Services;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.Extensions.Caching.Distributed;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using Moq;

namespace IdentityService.Unit.Utils;

public class MockHelpers
{
    public static StringBuilder LogMessage = new();

    public static Mock<UserManager<TUser>> MockUserManager<TUser>() where TUser : class
    {
        var store = new Mock<IUserStore<TUser>>();

        var mgr = new Mock<UserManager<TUser>>(
            store.Object,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );

        mgr.Object.UserValidators.Add(new UserValidator<TUser>());
        mgr.Object.PasswordValidators.Add(new PasswordValidator<TUser>());

        return mgr;
    }

    public static Mock<RoleManager<TRole>> MockRoleManager<TRole>(IRoleStore<TRole>? store = null)
        where TRole : class
    {
        store = store ?? new Mock<IRoleStore<TRole>>().Object;
        var roles = new List<IRoleValidator<TRole>>();
        roles.Add(new RoleValidator<TRole>());

        return new Mock<RoleManager<TRole>>(
            store,
            roles,
            new UpperInvariantLookupNormalizer(),
            new IdentityErrorDescriber(),
            null
        );
    }

    public static Mock<SignInManager<TUser>> MockSignInManger<TUser>() where TUser : class
    {
        var userManager = MockUserManager<TUser>();
        var context = new Mock<IHttpContextAccessor>();
        var claimsFactory = new Mock<IUserClaimsPrincipalFactory<TUser>>();

        var manager = new Mock<SignInManager<TUser>>(
            userManager.Object,
            context.Object,
            claimsFactory.Object,
            null,
            null,
            null,
            null
        );

        return manager;
    }

    public static UserManager<TUser> TestUserManager<TUser>(IUserStore<TUser>? store = null)
        where TUser : class
    {
        store = store ?? new Mock<IUserStore<TUser>>().Object;
        var options = new Mock<IOptions<IdentityOptions>>();
        var idOptions = new IdentityOptions();
        idOptions.Lockout.AllowedForNewUsers = false;
        options.Setup(o => o.Value).Returns(idOptions);
        var userValidators = new List<IUserValidator<TUser>>();
        var validator = new Mock<IUserValidator<TUser>>();
        userValidators.Add(validator.Object);
        var pwdValidators = new List<PasswordValidator<TUser>>();
        pwdValidators.Add(new PasswordValidator<TUser>());

        var userManager = new UserManager<TUser>(
            store,
            options.Object,
            new PasswordHasher<TUser>(),
            userValidators,
            pwdValidators,
            new UpperInvariantLookupNormalizer(),
            new IdentityErrorDescriber(),
            null,
            new Mock<ILogger<UserManager<TUser>>>().Object
        );

        validator
            .Setup(v => v.ValidateAsync(userManager, It.IsAny<TUser>()))
            .Returns(Task.FromResult(IdentityResult.Success))
            .Verifiable();

        return userManager;
    }

    public static RoleManager<TRole> TestRoleManager<TRole>(IRoleStore<TRole>? store = null)
        where TRole : class
    {
        store = store ?? new Mock<IRoleStore<TRole>>().Object;
        var roles = new List<IRoleValidator<TRole>>();
        roles.Add(new RoleValidator<TRole>());

        return new RoleManager<TRole>(
            store,
            roles,
            new UpperInvariantLookupNormalizer(),
            new IdentityErrorDescriber(),
            null
        );
    }

    public static Mock<IHttpContextAccessor> MockHttpContextAccessor()
    {
        var contextAccessorMock = new Mock<IHttpContextAccessor>();

        var context = new DefaultHttpContext();

        contextAccessorMock.Setup(accessor => accessor.HttpContext).Returns(context);

        return contextAccessorMock;
    }

    public static Mock<CacheService> MockCacheService()
    {
        var distributedCache = new Mock<IDistributedCache>();

        var cacheMock = new Mock<CacheService>(distributedCache.Object);

        return cacheMock;
    }

    public static Mock<AuthorizationRequest> MockAuthorizationRequest()
    {
        var scopeName = "apiMock";
        var apiScopeMock = new Mock<ApiScope>(scopeName);
        var parsedScopeMock = new Mock<ParsedScopeValue>(scopeName);
        var authRequestMock = new Mock<AuthorizationRequest>();
        var resourcesMock = new Mock<Resources>();
        var client = new Mock<Client>();
        var validatedResources = new ResourceValidationResult(resourcesMock.Object);

        resourcesMock.Object.ApiScopes = new List<ApiScope> { apiScopeMock.Object };

        validatedResources.ParsedScopes.Add(parsedScopeMock.Object);
        validatedResources.Resources.IdentityResources.Add(new IdentityResources.OpenId());

        authRequestMock.Object.Client = client.Object;
        authRequestMock.Object.ValidatedResources = validatedResources;

        return authRequestMock;
    }

    public static IPrincipal MockClaimsPrincipal()
    {
        var claimMock = new Mock<Claim>("foo", "bar");
        var identityMock = new Mock<ClaimsIdentity>();

        identityMock
            .Setup(identity => identity.FindFirst(It.IsAny<string>()))
            .Returns(claimMock.Object);

        IPrincipal principal = new ClaimsPrincipal(identityMock.Object);

        return principal;
    }

    public static Mock<IUrlHelper> MockUrlHelper()
    {
        var urlHelperMock = new Mock<IUrlHelper>(MockBehavior.Strict);

        urlHelperMock
            .Setup(x => x.Action(It.IsAny<UrlActionContext>()))
            .Returns("callbackUrl")
            .Verifiable();

        return urlHelperMock;
    }
}
