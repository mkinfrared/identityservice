using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

using AutoMapper;

using FluentValidation.TestHelper;

using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Options;

using IdentityService.Configuration;

using Microsoft.EntityFrameworkCore;
using ApiScope = IdentityService.Features.ApiScope;

using Xunit;

namespace IdentityService.Unit.Features.ApiScopeTest;

public class CreateApiScopeTest
{
    private readonly ConfigurationDbContext _mockDbContext;
    private readonly IMapper _mapper;
    private readonly ApiScope.CreateApiScope.Validator _validator;

    public CreateApiScopeTest()
    {
        _validator = new ApiScope.CreateApiScope.Validator();

        var options = new DbContextOptionsBuilder<ConfigurationDbContext>()
            .UseInMemoryDatabase(databaseName: GetType().FullName) // Unique name for in-memory database
            .Options;

        var storeOptions = new ConfigurationStoreOptions(); // Or initialize with desired values
        _mockDbContext = new ConfigurationDbContext(options, storeOptions);

        var configuration = new MapperConfiguration(cfg =>
        {
            // Add your AutoMapper profiles here, for example:
            cfg.AddProfile(new AutoMapperConfig());
        });

        _mapper = new Mapper(configuration);
    }

    [Fact]
    public async Task Handle_ShouldSaveApiScope_ReturnApiScopeReadDto()
    {
        // Arrange
        var name = "marklar";
        var description = "description";
        var displayName = "FOOBAR";
        bool emphasize = false;
        bool enabled = true;
        bool required = false;
        bool showInDiscoveryDocument = true;
        List<string> userClaims = new List<string> { "foo", "bar" };

        // var expectedApiScope =
        // new IdentityServer4.EntityFramework.Entities.ApiScope(); // Assuming ApiScope is the entity model

        var command = new ApiScope.CreateApiScope.Command(
            description,
            displayName,
            emphasize,
            enabled,
            name,
            required,
            showInDiscoveryDocument,
            userClaims
        ); // Provide test data for the Command class

        // Act
        var commandHandler = new ApiScope.CreateApiScope.CommandHandler(
            _mockDbContext,
            _mapper
        );
        var result = await commandHandler.Handle(
            command,
            CancellationToken.None
        );

        // Assert
        Assert.NotNull(result);
        Assert.Single(_mockDbContext.ApiScopes);
    }

    [Fact]
    public void ShouldHaveErrorWhenNameIsNull()
    {
        // Arrange
        string? name = null;
        var description = "description";
        var displayName = "FOOBAR";
        bool emphasize = false;
        bool enabled = true;
        bool required = false;
        bool showInDiscoveryDocument = true;
        List<string> userClaims = new List<string> { "foo", "bar" };
        var command = new ApiScope.CreateApiScope.Command(
            description,
            displayName,
            emphasize,
            enabled,
            name,
            required,
            showInDiscoveryDocument,
            userClaims
        );

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(command => command.Name);
    }

    [Fact]
    public void ShouldHaveErrorWhenNameIsEmpty()
    {
        // Arrange
        string name = String.Empty;
        var description = "description";
        var displayName = "FOOBAR";
        bool emphasize = false;
        bool enabled = true;
        bool required = false;
        bool showInDiscoveryDocument = true;
        List<string> userClaims = new List<string> { "foo", "bar" };
        var command = new ApiScope.CreateApiScope.Command(
            description,
            displayName,
            emphasize,
            enabled,
            name,
            required,
            showInDiscoveryDocument,
            userClaims
        );

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldHaveValidationErrorFor(command => command.Name);
    }

    [Fact]
    public void ShouldNotHaveErrorWhenNameIsSpecified()
    {
        // Arrange
        string name = "Test Name";
        var description = "description";
        var displayName = "FOOBAR";
        bool emphasize = false;
        bool enabled = true;
        bool required = false;
        bool showInDiscoveryDocument = true;
        List<string> userClaims = new List<string> { "foo", "bar" };
        var command = new ApiScope.CreateApiScope.Command(
            description,
            displayName,
            emphasize,
            enabled,
            name,
            required,
            showInDiscoveryDocument,
            userClaims
        );

        // Act
        var result = _validator.TestValidate(command);

        // Assert
        result.ShouldNotHaveValidationErrorFor(command => command.Name);
    }

    [Fact]
    public void Dispose()
    {
        // Cleanup...
        // _mockDbContext.Dispose(); // Cleans up the In-Memory database

        _mockDbContext.Database.EnsureDeleted(); // cleanup
    }
}
