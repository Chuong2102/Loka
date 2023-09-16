using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public interface ILocationRepository : IEFRepositoryBase<Location>
    {
        double GetLatByRoomID(int roomID);
        double GetLongiByRoomID(int roomID);
    }
}
