var target = Argument("target", "Start");

#addin nuget:?package=Cake.DotNetCoreEf&version=0.10.0

/*  Change the output artifacts and their configuration here. */
var parentDirectory = Directory("./src/IdentityService");
var userDbContext = "AppDbContext";
var configurationDbContext = "ConfigurationDbContext";
var persistedGrantDbContext = "PersistedGrantDbContext";

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

Task("Start")
    .IsDependentOn("Update User Context")
    .IsDependentOn("Update Configuration Context")
    .IsDependentOn("Update Persisted Grant Context")
    .Does(() => {});

RunTarget(target);
