namespace Loka.Infrastructure.Repositories
{
    public static class ServiceCollectionExtension
    {
        public static void RegisterServices(this IServiceCollection services)
        {

            services.AddTransient<IDataContext, DataContext>();

            services.AddTransient<IRoomRepository, RoomRepository>();
            services.AddTransient<IPostRepository, PostRepository>();

        }
    }
}
