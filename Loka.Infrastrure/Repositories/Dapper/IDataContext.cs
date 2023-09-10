namespace Loka.Infrastructure.Repositories.Dapper
{
    public interface IDataContext
    {
        IPostRepository Posts { get; }
        IRoomRepository Rooms { get; }
        IAddressRepository Addressses { get; }
        ILocationRepository Locations { get; }
        IPhotoRepository Photos { get; }
    }
}
