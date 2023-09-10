using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public interface IAddressRepository : IEFRepositoryBase<Address>
    {
        Task<Address> GetByRoomID(int id);
    }
}
