using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.EntityFrameworkCore;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public class RoomRepository : EFRepositoryBase<Room>, IRoomRepository
    {
        DataLokaContext _context;
        public RoomRepository(DataLokaContext dataLoka) : base(dataLoka)
        {
            _context = dataLoka;
        }

        public async Task<Room> GetByID(int id)
        {
            return await _context.Rooms.FirstOrDefaultAsync(r => r.RoomID == id);
        }
    }
}
