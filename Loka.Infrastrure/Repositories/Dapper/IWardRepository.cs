using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public interface IWardRepository : IRepositoryBase<Ward>
    {
        Task<Ward> GetByRoomID(int roomID);
    }
}
