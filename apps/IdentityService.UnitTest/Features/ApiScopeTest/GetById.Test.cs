using Xunit;

using IdentityServer4.EntityFramework.DbContexts;

using AutoMapper;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using System.Threading;

using IdentityServer4.EntityFramework.Options;

using IdentityService.Configuration;

using ApiScope = IdentityService.Features.ApiScope;

namespace IdentityService.Unit.Features.ApiScopeTest;

public class GetByIdTest
{
    private readonly IMapper _mapper;
    private readonly ConfigurationDbContext _mockDbContext;

    public GetByIdTest()
    {
        var configuration = new MapperConfiguration(cfg =>
        {
            // Add your AutoMapper profiles here, for example:
            cfg.AddProfile(new AutoMapperConfig());
        });

        _mapper = new Mapper(configuration);

        var options = new DbContextOptionsBuilder<ConfigurationDbContext>()
            .UseInMemoryDatabase(databaseName: GetType().FullName) // Unique name for in-memory database
            .Options;

        var storeOptions = new ConfigurationStoreOptions(); // Or initialize with desired values
        _mockDbContext = new ConfigurationDbContext(options, storeOptions);
    }

    [Fact]
    public async Task Handle_ShouldReturnApiScopeReadDtoGivenValidId()
    {
        // Arrange
        var id = 1;

        var expectedApiScope =
            new IdentityServer4.EntityFramework.Entities.ApiScope
            {
                Id = 1,
                Name = "Marklar",
                DisplayName = "Foobar",
                Description = "foo",
                Required = true
            }; // Create a test ApiScope

        _mockDbContext.ApiScopes.Add(expectedApiScope);
        await _mockDbContext.SaveChangesAsync();
        var request = new ApiScope.GetById.GetByIdQuery(id);

        // Act
        var handler = new ApiScope.GetById.GetByIdQueryHandler(
            _mockDbContext,
            _mapper
        );
        var result = await handler.Handle(request, CancellationToken.None);

        // Assert
        Assert.NotNull(result);
        Assert.Equal(expectedApiScope.Id, result.Id);
    }

    [Fact]
    public async Task Handle_ReturnNull_WhenApiScopeDidNotExist()
    {
        var scope = new IdentityServer4.EntityFramework.Entities.ApiScope
        {
            Id = 2,
            Name = "TestScope"
        };

        _mockDbContext.ApiScopes.Add(scope);
        await _mockDbContext.SaveChangesAsync();

        var queryHandler = new ApiScope.GetById.GetByIdQueryHandler(
            _mockDbContext,
            _mapper
        );
        var query = new ApiScope.GetById.GetByIdQuery(999);
        var result = await queryHandler.Handle(query, default);

        Assert.Null(result);

        _mockDbContext.ApiScopes.Remove(scope);
        await _mockDbContext.SaveChangesAsync();
    }

    [Fact]
    public void Dispose()
    {
        // Cleanup...
        // _mockDbContext.Dispose(); // Cleans up the In-Memory database

        _mockDbContext.Database.EnsureDeleted(); // cleanup
    }
}
