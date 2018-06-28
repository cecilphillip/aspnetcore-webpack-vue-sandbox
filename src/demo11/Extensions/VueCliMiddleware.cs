using System;
using System.IO;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging.Console;
using System.Net.Sockets;
using System.Net;

namespace demo11.Extensions
{
    public static class VueCliMiddleware
    {
        private const string LogCategoryName = "Microsoft.AspNetCore.SpaServices";
        private static TimeSpan RegexMatchTimeout = TimeSpan.FromSeconds(10);

        public static void Attach(ISpaBuilder spaBuilder, string npmScriptName)
        {
            var sourcePath = spaBuilder.Options.SourcePath;
            if (string.IsNullOrEmpty(sourcePath))
            {
                throw new ArgumentException("Cannot be null or empty", nameof(sourcePath));
            }

            if (string.IsNullOrEmpty(npmScriptName))
            {
                throw new ArgumentException("Cannot be null or empty", nameof(npmScriptName));
            }

            // Start Vue CLI and attach to middleware pipeline
            var appBuilder = spaBuilder.ApplicationBuilder;
            var logger = LoggerFinder.GetOrCreateLogger(appBuilder, LogCategoryName);
            var vueCliServerInfoTask = StartVueCliServerAsync(sourcePath, npmScriptName, logger);

            SpaProxyingExtensions.UseProxyToSpaDevelopmentServer(spaBuilder, () =>
            {
                // On each request, we create a separate startup task with its own timeout. That way, even if
                // the first request times out, subsequent requests could still work.
                var timeout = spaBuilder.Options.StartupTimeout;
                return vueCliServerInfoTask.WithTimeout(timeout,
                    $"The Vue CLI process did not start listening for requests " +
                    $"within the timeout period of {timeout.Seconds} seconds. " +
                    $"Check the log output for error information.");
            });
        }

        private static async Task<Uri> StartVueCliServerAsync(string sourcePath, string npmScriptName, ILogger logger)
        {
            var portNumber = FindAvailablePort();
            logger.LogInformation("Starting the Vue CLI");

            var npmScriptRunner = new NpmScriptRunner(sourcePath, npmScriptName, string.Empty, null);

            var uri = new Uri("http://localhost:8080");

            await WaitForAngularCliServerToAcceptRequests(uri);

            return uri;
        }

        private static async Task WaitForAngularCliServerToAcceptRequests(Uri cliServerUri)
        {
            var timeoutMilliseconds = 1000;
            var client = new HttpClient();

            while (true)
            {
                try
                {
                    // If we get any HTTP response, the CLI server is ready
                    await client.SendAsync(new HttpRequestMessage(HttpMethod.Head, cliServerUri), new CancellationTokenSource(timeoutMilliseconds).Token);
                    break;
                }
                catch (Exception)
                {
                    await Task.Delay(500);

                    // Depending on the host's networking configuration, the requests can take a while
                    // to go through, most likely due to the time spent resolving 'localhost'.
                    // Each time we have a failure, allow a bit longer next time (up to a maximum).
                    // This only influences the time until we regard the dev server as 'ready', so it
                    // doesn't affect the runtime perf (even in dev mode) once the first connection is made.
                    // Resolves https://github.com/aspnet/JavaScriptServices/issues/1611
                    if (timeoutMilliseconds < 10000)
                    {
                        timeoutMilliseconds += 3000;
                    }
                }
            }
        }

        private static int FindAvailablePort()
        {
            var listener = new TcpListener(IPAddress.Loopback, 0);
            listener.Start();
            try
            {
                return ((IPEndPoint)listener.LocalEndpoint).Port;
            }
            finally
            {
                listener.Stop();
            }
        }
    }

    public static class LoggerFinder
    {
        public static ILogger GetOrCreateLogger(IApplicationBuilder appBuilder, string logCategoryName)
        {
            // If the DI system gives us a logger, use it. Otherwise, set up a default one.
            var loggerFactory = appBuilder.ApplicationServices.GetService<ILoggerFactory>();
            var logger = loggerFactory != null ? loggerFactory.CreateLogger(logCategoryName) : new ConsoleLogger(logCategoryName, null, false);
            return logger;
        }
    }
}
