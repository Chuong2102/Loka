namespace Loka.Infrastructure.Repositories
{
    public interface IDataContext
    {
        IPostRepository Posts { get; }
        IRoomRepository Rooms{ get; }
        IAddressRepository Addressses { get; }
        ILocationRepository Locations { get; }
    }
}
