using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public class WardRepository : IWardRepository
    {
        private readonly IConfiguration configuration;
        private DataLokaContext _dbContext;

        readonly private string connectionString = "ConnectionStringName";

        public WardRepository(IConfiguration configuration, DataLokaContext dbContext)
        {
            this.configuration = configuration;
            _dbContext = dbContext;
        }

        public Task<int> CreateAsync(Ward entity)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteAsync(Ward entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Ward>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<Ward> GetByID(int id)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"select * from Wards where WardID = " + id.ToString();

            var ward = await connection.QuerySingleAsync<Ward>(sql);

            return ward;
        }

        public Task<Ward> GetByRoomID(int roomID)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Ward entity)
        {
            throw new NotImplementedException();
        }
    }
}
