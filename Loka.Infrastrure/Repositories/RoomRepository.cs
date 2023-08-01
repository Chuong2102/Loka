using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.EntityFrameworkCore;
using static System.Reflection.Metadata.BlobBuilder;

namespace Loka.Infrastructure.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly IConfiguration configuration;
        private DataLokaContext dbContext;

        public RoomRepository(IConfiguration configuration, DataLokaContext _dbContext)
        {
            this.configuration = configuration;
            this.dbContext = _dbContext;
        }

        public Task<Room> CreateAsync(Room entity)
        {
            throw new NotImplementedException();
        }

        public Task<Room> DeleteAsync(Room entity)
        {
            throw new NotImplementedException();
        }

        //public async Task<IEnumerable<Room>> FindByName(string searchString)
        //{
        //    try
        //    {
        //        if (!String.IsNullOrEmpty(searchString))
        //            return await dbContext.Rooms.Include(x => x.Address)
        //                .Where(x => x.Name.Contains(searchString)
        //            || x.Description.Contains(searchString)
        //            || x.Address.AddressLine1.Contains(searchString)
        //            || x.Address.AddressLine2.Contains(searchString)
        //            || x.Address.Ward.WardName.Contains(searchString))
        //                 .ToListAsync();
        //    }
        //    catch (Exception e)
        //    {
        //        throw e;
        //    }
        //    return null;
        //}
        public async Task<IEnumerable<Room>> FindByName(string searchString)
        {
            if (string.IsNullOrEmpty(searchString))
                return Enumerable.Empty<Room>();

            try
            {
                return await dbContext.Rooms
                    .Where(x => x.Name.Contains(searchString)
                        || x.Description.Contains(searchString)
                        || x.Address.AddressLine1.Contains(searchString)
                        || x.Address.AddressLine2.Contains(searchString)
                        )
                    .ToListAsync();
            }
            catch (Exception e)
            {
                throw e;
            }
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