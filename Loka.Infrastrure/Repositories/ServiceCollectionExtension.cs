
﻿using Loka.Infrastructure.Services;
﻿using Loka.Infrastructure.Repositories.Dapper;
using Loka.Infrastructure.Repositories.EFCore;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;
using Loka.Infrastructure.Entities;

namespace Loka.Infrastructure.Repositories
{
    public static class ServiceCollectionExtension
    {
        public static void RegisterServices(this IServiceCollection services)
        {

            services.AddTransient<IDataContext, DataContext>();
            services.AddTransient<IEFDataContext, EFDataContext>();
            services.AddTransient(typeof(IEFRepositoryBase<>), typeof(EFRepositoryBase<>)); ;

            // Room
            services.AddTransient<Dapper.IRoomRepository, Dapper.RoomRepository>();
            services.AddTransient<EFCore.IRoomRepository, EFCore.RoomRepository>();
            // Post
            services.AddTransient<Dapper.IPostRepository, Dapper.PostRepository>();
            services.AddTransient<EFCore.IPostRepository, EFCore.PostRepository>();
            // Location
            services.AddTransient<Dapper.ILocationRepository, Dapper.LocationRepository>();
            services.AddTransient<EFCore.ILocationRepository, EFCore.LocationRepository>();
            // Photo
            services.AddTransient<Dapper.IPhotoRepository, Dapper.PhotoRepository>();
            // Address
            services.AddTransient<Dapper.IAddressRepository, Dapper.AddressRepository>();
            services.AddTransient<EFCore.IAddressRepository, EFCore.AddressRepository>();
            // School
            services.AddTransient<EFCore.ISchoolRepository, SchoolRepository>();

            // Service
            //
            services.AddTransient<IRoomServices, RoomServices>();
            services.AddScoped<EFRepositoryBase<Post>>();
            services.AddTransient<IPostServices, PostServices>();
            services.AddScoped<EFRepositoryBase<Room>>();

        }
    }
}
