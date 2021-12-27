var target = Argument("target", "Open");

#addin nuget:?package=Cake.Coverlet&version=2.5.4
#addin nuget:?package=Cake.Yarn&version=0.4.8
#tool nuget:?package=ReportGenerator&version=4.8.13

/*  Specify the relative paths to your tests projects here. */
var testProjectsRelativePaths = new string[]
{
    "./src/IdentityService.UnitTest/IdentityService.UnitTest.csproj",
};

/*  Change the output artifacts and their configuration here. */
uint threshold = 80;
var unitTestDirectory = Directory("./src/IdentityService.UnitTest/");
var rootDirectory = Directory(".");
var coverageDirectory = unitTestDirectory + Directory("coverage");
var historyDirectory = unitTestDirectory + Directory("history");
var cuberturaFileName = "results";
var cuberturaFileExtension = ".cobertura.xml";
var coverageFilePath = coverageDirectory + File(cuberturaFileName + cuberturaFileExtension);
var jsonFilePath = coverageDirectory + File(cuberturaFileName + ".json");

Task("Clean")
    .Does(() =>
{
    if (!DirectoryExists(coverageDirectory))
        CreateDirectory(coverageDirectory);
    else
        CleanDirectory(coverageDirectory);
});

Task("TestTS")
    .Does(() =>
{
    Yarn.FromPath(rootDirectory).RunScript("test");
});

Task("TestNet")
    .IsDependentOn("Clean")
    .Does(() =>
{
    var testSettings = new DotNetCoreTestSettings
    {
        // 'trx' files will be used to publish the results of tests' execution in an Azure DevOps pipeline.
        ArgumentCustomization = args =>
        {
            args.Append($"--logger trx");
            args.Append($"/p:ThresholdStat=total");

            return args;
        }
    };

    var coverletSettings = new CoverletSettings
    {
        CollectCoverage = true,
        CoverletOutputDirectory = coverageDirectory,
        CoverletOutputName = cuberturaFileName,
        Exclude = new List<string> {
            "[*Views]*",
            "[*]AspNetCoreGeneratedDocument.*"
        },
        ExcludeByFile = new List<string> {
            "**/DbContexts/*",
            "**/Migrations/**",
            "**/Models/*",
            "**/Pages/*",
            "**/Services/*",
            "**/Views",
            "**/Config.cs",
            "**/Program.cs",
            "**/Program.cs",
            "**/SeedData.cs",
            "**/Startup.cs",
        },
        Threshold = threshold
    };

    if (testProjectsRelativePaths.Length == 1)
    {
        coverletSettings.CoverletOutputFormat  = CoverletOutputFormat.cobertura;
        DotNetCoreTest(testProjectsRelativePaths[0], testSettings, coverletSettings);
    }
    else
    {
        DotNetCoreTest(testProjectsRelativePaths[0], testSettings, coverletSettings);

        coverletSettings.MergeWithFile = jsonFilePath;
        for (int i = 1; i < testProjectsRelativePaths.Length; i++)
        {
            if (i == testProjectsRelativePaths.Length - 1)
            {
                coverletSettings.CoverletOutputFormat  = CoverletOutputFormat.cobertura;
            }

            DotNetCoreTest(testProjectsRelativePaths[i], testSettings, coverletSettings);
        }
    }
});

Task("Report")
    .IsDependentOn("TestTS")
    .IsDependentOn("TestNet")
    .Does(() =>
{
    if (IsRunningOnWindows()) {
        var reportSettings = new ReportGeneratorSettings
        {
            ReportTypes = { ReportGeneratorReportType.HtmlInline_AzurePipelines_Dark },
            HistoryDirectory = historyDirectory
        };
        ReportGenerator(coverageFilePath, coverageDirectory, reportSettings);
    }
});

Task("Open")
    .IsDependentOn("Report")
    .Does(() =>
    {
        if (IsRunningOnWindows())
        {
            Information("Windows!");
            var netReportPath = coverageDirectory + File("index.html");

            StartProcess("cmd", new ProcessSettings {
                Arguments = $"/C start \"\" {netReportPath}"
            });
        }
    });

RunTarget(target);
