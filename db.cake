var target = Argument("target", "Update");

#addin nuget:?package=Cake.DotNetCoreEf&version=1.0.0

/*  Change the output artifacts and their configuration here. */
var parentDirectory = Directory("./apps/IdentityService");
var userDbContext = "AppDbContext";
var configurationDbContext = "ConfigurationDbContext";
var persistedGrantDbContext = "PersistedGrantDbContext";

Task("Create AppDb Migration")
    .Does(() =>
{
    var name = Argument<string>("name");
    var migrationName = name + "IdentityDbMigration";
    var migrationDirectory = Directory("./Migrations/IdentityDb");

    var settings = new DotNetCoreEfMigrationAddSettings
    {
        Context = userDbContext,
        Migration = migrationName,
        OutputDir = migrationDirectory
    };

    DotNetCoreEfMigrationAdd(parentDirectory, settings);
});

Task("Create Configuration Migration")
    .Does(() =>
{
    var name = Argument<string>("name");
    var migrationName = name + "ConfigurationDbMigration";
    var migrationDirectory = Directory("./Migrations/ConfigurationDb");

    var settings = new DotNetCoreEfMigrationAddSettings
    {
        Context = userDbContext,
        Migration = migrationName,
        OutputDir = migrationDirectory
    };

    DotNetCoreEfMigrationAdd(parentDirectory, settings);
});

Task("Create Persisted Grant Migration")
    .Does(() =>
{
    var name = Argument<string>("name");
    var migrationName = name + "PersistedGrantDbMigration";
    var migrationDirectory = Directory("./Migrations/PersistedGrantDb");

    var settings = new DotNetCoreEfMigrationAddSettings
    {
        Context = userDbContext,
        Migration = migrationName,
        OutputDir = migrationDirectory
    };

    DotNetCoreEfMigrationAdd(parentDirectory, settings);
});

Task("Update AppDb Context")
    .Does(() =>
{
    var settings = new DotNetCoreEfDatabaseUpdateSettings
    {
        Context = userDbContext
    };

    DotNetCoreEfDatabaseUpdate(parentDirectory, settings);
});

Task("Update Configuration Context")
    .Does(() =>
{
    var settings = new DotNetCoreEfDatabaseUpdateSettings
    {
        Context = configurationDbContext
    };

    DotNetCoreEfDatabaseUpdate(parentDirectory, settings);
});

Task("Update Persisted Grant Context")
    .Does(() =>
{
    var settings = new DotNetCoreEfDatabaseUpdateSettings
    {
        Context = persistedGrantDbContext
    };

    DotNetCoreEfDatabaseUpdate(parentDirectory, settings);
});

Task("Create")
    .IsDependentOn("Create AppDb Migration")
    .IsDependentOn("Create Configuration Migration")
    .IsDependentOn("Create Persisted Grant Migration")
    .Does(() => {});

Task("Update")
    .IsDependentOn("Update AppDb Context")
    .IsDependentOn("Update Configuration Context")
    .IsDependentOn("Update Persisted Grant Context")
    .Does(() => {});

RunTarget(target);
