using Dapper;
using Loka.Infrastructure.Contracts;
using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using System.Data;
using System.Data.SqlClient;

namespace Loka.Infrastructure.Repositories
{
    public class RoomRepository : IRoomRepository
    {
        private readonly IConfiguration configuration;

        readonly private string connectionString = "ConnectionStringName";
        public RoomRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
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
                para.Add("@Name", entity.Name);
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

        public Task<List<Room>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Room> GetByID(int id)
        {
            throw new NotImplementedException();
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
                para.Add("@Name", entity.Name);
                para.Add("@Description", entity.Description);
                para.Add("@Price", entity.Price);
                para.Add("@Area", entity.Area);

                return await connection.ExecuteAsync(RoomQuery.Proc_UpdateRoom, para, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
