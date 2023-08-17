using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public interface IRoomRepository : IEFRepositoryBase<Room>
    {
        Task<Room> GetByID(int id);
    }
}
