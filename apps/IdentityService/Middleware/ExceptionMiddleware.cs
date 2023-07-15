using System;
using System.Text.Json;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

using Npgsql;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger
    )
    {
        _next = next;
        _logger = logger;
    }

    public class ErrorDetails
    {
        public int StatusCode { get; set; }
        public string Message { get; set; }

        public override string ToString()
        {
            return JsonSerializer.Serialize(this);
        }
    }

    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            _logger.LogError($"Something went wrong: {ex}");
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(
        HttpContext context,
        Exception exception
    )
    {
        var statusCode = StatusCodes.Status500InternalServerError;
        var message = $"Internal Server Error: {exception.Message}";

        switch (exception)
        {
            // If you want to add more cases for other types of exceptions,
            // you can add them here.
            case DbUpdateException dbEx:
                if (
                    ((NpgsqlException)dbEx.InnerException)?.SqlState
                    == PostgresErrorCodes.UniqueViolation
                )
                {
                    statusCode = StatusCodes.Status422UnprocessableEntity;
                    message =
                        $"An object with the given key already exists. {dbEx.InnerException.Message}";
                }
                else
                {
                    // Generic handler for DbUpdateException.
                    statusCode = StatusCodes.Status500InternalServerError;

                    message =
                        $"An error occurred while updating the database: {dbEx.Message}";
                }

                break;
        }

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        await context.Response.WriteAsync(
            new ErrorDetails
            {
                Message = message,
                StatusCode = statusCode
            }.ToString()
        );
    }
}
