using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public class AddressRepository : EFRepositoryBase<Address>, IAddressRepository
    {
        DataLokaContext _context;
        public AddressRepository(DataLokaContext dataLoka) : base(dataLoka)
        {
            _context = dataLoka;
        }

        public async Task<Address> GetByRoomID(int id)
        {
            return await _context.Addresses.FirstOrDefaultAsync(a => a.RoomID == id);
        }
    }
}
