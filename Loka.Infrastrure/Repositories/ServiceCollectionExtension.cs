
﻿using Loka.Infrastructure.Services;
﻿using Loka.Infrastructure.Repositories.Dapper;
using Loka.Infrastructure.Repositories.EFCore;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories
{
    public static class ServiceCollectionExtension
    {
        public static void RegisterServices(this IServiceCollection services)
        {

            services.AddTransient<IDataContext, DataContext>();
            services.AddTransient<IEFDataContext, EFDataContext>();
            services.AddTransient(typeof(IEFRepositoryBase<>), typeof(EFRepositoryBase<>)); ;

            services.AddTransient<Dapper.IRoomRepository, Dapper.RoomRepository>();
            services.AddTransient<EFCore.IRoomRepository, EFCore.RoomRepository>();

            services.AddTransient<IPostRepository, PostRepository>();

            services.AddTransient<Dapper.ILocationRepository, Dapper.LocationRepository>();
            services.AddTransient<EFCore.ILocationRepository, EFCore.LocationRepository>();

            services.AddTransient<IAddressRepository, AddressRepository>();
            services.AddTransient<IRoomServices, RoomServices>();
            services.AddScoped<EFRepositoryBase<Post>>();
            services.AddTransient<IPostServices, PostServices>();
            services.AddScoped<EFRepositoryBase<Room>>();

        }
    }
}
