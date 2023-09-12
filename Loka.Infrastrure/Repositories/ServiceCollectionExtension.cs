
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
            services.AddTransient(typeof(IEFRepositoryBase<>), typeof(EFRepositoryBase<>));

            // Room
            services.AddTransient<Dapper.IRoomRepository, Dapper.RoomRepository>();
            // Post
            services.AddTransient<Dapper.IPostRepository, Dapper.PostRepository>();
            // Location
            services.AddTransient<Dapper.ILocationRepository, Dapper.LocationRepository>();
            // Photo
            services.AddTransient<Dapper.IPhotoRepository, Dapper.PhotoRepository>();
            // Address
            services.AddTransient<Dapper.IAddressRepository, Dapper.AddressRepository>();
            // School
            services.AddTransient<EFCore.ISchoolRepository, SchoolRepository>();
            // Ward 
            services.AddTransient<Dapper.IWardRepository, Dapper.WardRepository>();


            // Service
            //
            services.AddTransient<IRoomServices, RoomServices>();
            services.AddScoped<EFRepositoryBase<Post>>();
            services.AddTransient<IPostServices, PostServices>();
            services.AddScoped<EFRepositoryBase<Room>>();

        }
    }
}
