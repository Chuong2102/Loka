using Dapper;
using Loka.Infrastructure.Contracts;
using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;
using System.Linq.Expressions;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public class RoomRepository : IRoomRepository
    {
        private readonly IConfiguration configuration;
        private DataLokaContext _dbContext;

        readonly private string connectionString = "ConnectionStringName";
        public RoomRepository(IConfiguration configuration, DataLokaContext dbContext)
        {
            this.configuration = configuration;
            _dbContext = dbContext;
        }

        public async Task<int> CreateAsync(Room entity)
        {
            using (IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString)))
            {
                connection.Open();

                // Add Room
                //
                var para = new DynamicParameters();
                // Input para
                para.Add("@UserID", 3);
                //para.Add("@Name", entity.Name);
                para.Add("@Description", entity.Description);
                para.Add("@Price", entity.Price);
                para.Add("@Area", entity.Area);
                // Output para
                para.Add("@RoomID", dbType: DbType.Int32, direction: ParameterDirection.Output);

                // Excute
                await connection.ExecuteAsync(RoomQuery.ProcAddRoom, para, commandType: CommandType.StoredProcedure);
                // Get RoomID from new Room
                int RoomID = para.Get<int>("@RoomID");

                return RoomID;

            }

        }

        public async Task<List<Room>> GetAllAsync(params Expression<Func<Room, object>>[] includeProperties)
        {
            var query =  _dbContext.Rooms.AsQueryable();
            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }

            return await query.ToListAsync();
        }

        public async Task<List<Room>> GetAllAsync()
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            var result = await connection.QueryAsync<Room>(RoomQuery.AllRooms);
            
            return result.ToList();
        }

        public async Task<Room> GetByID(int id)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"select * from Rooms where RoomID = " + id.ToString();

            var room = await connection.QuerySingleAsync<Room>(sql);

            return room;
        }

        Task<int> IRepositoryBase<Room>.DeleteAsync(Room entity)
        {
            throw new NotImplementedException();
        }

        async Task<int> IRepositoryBase<Room>.UpdateAsync(Room entity)
        {
            using (IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString)))
            {
                connection.Open();

                var para = new DynamicParameters();

                // Post
                para.Add("@RoomID", entity.RoomID);
               // para.Add("@Name", entity.Name);
                para.Add("@Description", entity.Description);
                //para.Add("@Price", entity.Price);
                //para.Add("@Area", entity.Area);

                return await connection.ExecuteAsync(RoomQuery.Proc_UpdateRoom, para, commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Room> GetByPostID(int postID)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"select * from Rooms where PostID = " + postID.ToString();

            var room = await connection.QuerySingleAsync<Room>(sql);

            return room;
        }
    }
}
