using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using static Dapper.SqlMapper;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using System.Linq.Expressions;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public class AddressRepository : IAddressRepository
    {
        private readonly IConfiguration configuration;
        private DataLokaContext dbContext;

        private readonly string connectionString = "ConnectionStringName";

        public AddressRepository(IConfiguration configuration, DataLokaContext dbContext)
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(Address entity)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            var para = new DynamicParameters();

            para.Add("@RoomID", entity.Room.RoomID);
            para.Add("@AddressLine1", entity.AddressLine1);
            para.Add("@AddressLine2", entity.AddressLine2);
            para.Add("@WardID", entity.Ward.WardID);

            return await connection.ExecuteAsync(AddressQueries.Proc_AddAddress, para, commandType: CommandType.StoredProcedure);
        }

        public Task<int> DeleteAsync(Address entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Address>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Address> GetByID(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Address entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Address>> GetAllAsync(params Expression<Func<Address, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }
    }
}
