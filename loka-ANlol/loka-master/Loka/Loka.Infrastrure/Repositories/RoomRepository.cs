using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly IConfiguration configuration;
        public RoomRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public Task<Room> CreateAsync(Room entity)
        {
            throw new NotImplementedException();
        }

        public Task<Room> DeleteAsync(Room entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Room>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Room> GetByID(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Room> UpdateAsync(Room entity)
        {
            throw new NotImplementedException();
        }
    }
}
