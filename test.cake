var target = Argument("target", "Open");

#addin nuget:?package=Cake.Coverlet&version=2.5.4
#addin nuget:?package=Cake.Yarn&version=0.4.8
#tool nuget:?package=ReportGenerator&version=4.8.7

/*  Specify the relative paths to your tests projects here. */
var testProjectsRelativePaths = new string[]
{
    "./src/IdentityService.Test/IdentityService.Test.csproj",
};

/*  Change the output artifacts and their configuration here. */
uint threshold = 80;
var parentDirectory = Directory("./src/IdentityService.Test");
var reactDirectory = Directory("./src/IdentityService/client");
var coverageDirectory = parentDirectory + Directory("coverage");
var historyDirectory = parentDirectory + Directory("history");
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

Task("TestReact")
    .Does(() =>
{
    Yarn.FromPath(reactDirectory).RunScript("test");
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
        ExcludeByFile = new List<string> {
            "**/Pages/*",
            "**/Services/*",
            "**/Startup.cs",
            "**/Program.cs",
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
    .IsDependentOn("TestNet")
    .IsDependentOn("TestReact")
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
            var reactReportPath = reactDirectory + Directory("coverage/lcov-report") + File("index.html");

            StartProcess("cmd", new ProcessSettings {
                Arguments = $"/C start \"\" {netReportPath}"
            });

            StartProcess("cmd", new ProcessSettings {
                Arguments = $"/C start \"\" {reactReportPath}"
            });
        }
    });

RunTarget(target);
