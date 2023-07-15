using Moq;
using Xunit;
using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using Npgsql;

namespace IdentityService.Unit.Middleware;

public class ExceptionMiddlewareTests
{
    private Mock<RequestDelegate> _mockNext;
    private Mock<ILogger<ExceptionMiddleware>> _mockLogger;
    private ExceptionMiddleware _middleware;

    public ExceptionMiddlewareTests()
    {
        _mockNext = new Mock<RequestDelegate>();
        _mockLogger = new Mock<ILogger<ExceptionMiddleware>>();
        _middleware = new ExceptionMiddleware(
            _mockNext.Object,
            _mockLogger.Object
        );
    }

    [Fact]
    public async Task InvokeAsync_NoExceptions_NextCalled()
    {
        var context = new DefaultHttpContext();
        await _middleware.InvokeAsync(context);
        _mockNext.Verify(next => next(context), Times.Once);
    }

    [Fact]
    public async Task InvokeAsync_ExceptionCaught_LogErrorCalled()
    {
        var context = new DefaultHttpContext();
        var exception = new Exception("Test exception");
        _mockNext.Setup(next => next(context)).Throws(exception);
        await _middleware.InvokeAsync(context);

        _mockLogger.Verify(
            x =>
                x.Log(
                    It.IsAny<LogLevel>(),
                    It.IsAny<EventId>(),
                    It.Is<It.IsAnyType>((v, t) => true),
                    It.IsAny<Exception>(),
                    It.Is<Func<It.IsAnyType, Exception, string>>((v, t) => true)
                ),
            Times.Once
        );
    }

    [Fact]
    public async Task InvokeAsync_DbUpdateException_ReturnsCorrectResponse()
    {
        var context = new DefaultHttpContext
        {
            Response = { Body = new MemoryStream() }
        };
        var exception = new DbUpdateException("Test DB update exception");
        _mockNext.Setup(next => next(context)).Throws(exception);
        await _middleware.InvokeAsync(context);
        context.Response.Body.Seek(0, SeekOrigin.Begin);
        var reader = new StreamReader(context.Response.Body);
        var body = await reader.ReadToEndAsync();
        var errorDetails =
            JsonSerializer.Deserialize<ExceptionMiddleware.ErrorDetails>(body);
        Assert.Equal(
            StatusCodes.Status500InternalServerError,
            context.Response.StatusCode
        );
        Assert.Equal(
            $"An error occurred while updating the database: {exception.Message}",
            errorDetails.Message
        );
    }

    [Fact]
    public async Task InvokeAsync_DbUpdateException_NpgsqlUniqueViolation_ReturnsCorrectResponse()
    {
        var context = new DefaultHttpContext
        {
            Response = { Body = new MemoryStream() }
        };
        var messageText = "Test Postgres Excepiton";
        var severity = "high";
        var invariantSeverity = "marklar";
        var sqlState = PostgresErrorCodes.UniqueViolation;

        var postgresException = new PostgresException(
            messageText,
            severity,
            invariantSeverity,
            sqlState
        );
        var exception = new DbUpdateException(
            "Test DB update exception",
            postgresException
        );
        _mockNext.Setup(next => next(context)).Throws(exception);

        await _middleware.InvokeAsync(context);
        context.Response.Body.Seek(0, SeekOrigin.Begin);
        var reader = new StreamReader(context.Response.Body);
        var body = await reader.ReadToEndAsync();
        var errorDetails =
            JsonSerializer.Deserialize<ExceptionMiddleware.ErrorDetails>(body);

        Assert.Equal(
            StatusCodes.Status422UnprocessableEntity,
            context.Response.StatusCode
        );
        Assert.Equal(
            $"An object with the given key already exists. {postgresException.Message}",
            errorDetails.Message
        );
    }

    [Fact]
    public async Task InvokeAsync_OtherException_ReturnsCorrectResponse()
    {
        var context = new DefaultHttpContext
        {
            Response = { Body = new MemoryStream() }
        };
        var exception = new Exception("Test exception");
        _mockNext.Setup(next => next(context)).Throws(exception);

        await _middleware.InvokeAsync(context);
        context.Response.Body.Seek(0, SeekOrigin.Begin);
        var reader = new StreamReader(context.Response.Body);
        var body = await reader.ReadToEndAsync();
        var errorDetails =
            JsonSerializer.Deserialize<ExceptionMiddleware.ErrorDetails>(body);

        Assert.Equal(
            StatusCodes.Status500InternalServerError,
            context.Response.StatusCode
        );
        Assert.Equal(
            $"Internal Server Error: {exception.Message}",
            errorDetails.Message
        );
    }
}
