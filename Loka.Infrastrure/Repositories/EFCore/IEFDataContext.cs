namespace Loka.Infrastructure.Repositories.EFCore
{
    public interface IEFDataContext : IDisposable
    {
        ILocationRepository Locations { get; }
        IWardRepository Wards { get; }
        IRoomRepository Rooms { get; }
        IAddressRepository Addresss { get; }
        ISchoolRepository Schools { get; }
        IPostRepository Posts { get; }
    }
}
