using Loka.Infrastructure.Repositories.Dapper;
using Loka.Infrastructure.Repositories.EFCore;

namespace Loka.Infrastructure.Repositories
{
    public static class ServiceCollectionExtension
    {
        public static void RegisterServices(this IServiceCollection services)
        {

            services.AddTransient<IDataContext, DataContext>();
            services.AddTransient<IEFDataContext, IEFDataContext>();

            services.AddTransient<IRoomRepository, RoomRepository>();

            services.AddTransient<IPostRepository, PostRepository>();

            services.AddTransient<Dapper.ILocationRepository, Dapper.LocationRepository>();
            services.AddTransient<EFCore.ILocationRepository, EFCore.LocationRepository>();

            services.AddTransient<IAddressRepository, AddressRepository>();

        }
    }
}
