using Loka.Infrastructure.Identity;
using Loka.Infrastrure.Context;
using Microsoft.EntityFrameworkCore;

namespace Loka.Infrastructure
{
    public static class Dependencies
    {
        public static void ConfigureServices(IConfiguration configuration, IServiceCollection services)
        {
            services.AddDbContext<DataLokaContext>(
                options => options.UseSqlServer(configuration.GetConnectionString("ConnectionStringName"),
                opt => opt.UseNetTopologySuite()));

            // Add Identity DbContext
            services.AddDbContext<AppIdentityDbContext>(options =>
                options.UseSqlServer(configuration.GetConnectionString("IdentityConnection")));
        }
    }
}
