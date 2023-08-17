using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using NetTopologySuite.Geometries;
using Location = Loka.Infrastrure.Entities.Location;
using System.Linq.Expressions;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public class LocationRepository : ILocationRepository
    {
        private readonly IConfiguration configuration;
        private DataLokaContext dbContext;

        private readonly string connectionString = "ConnectionStringName";

        public LocationRepository(IConfiguration configuration, DataLokaContext dbContext)
        {
            this.configuration = configuration;
            this.dbContext = dbContext;
        }

        public async Task<int> CreateAsync(Location entity)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            var para = new DynamicParameters();

            para.Add("@RoomID", entity.Room.RoomID);
            para.Add("@PlaceID", entity.PlaceID);
            para.Add("@@Latitude", entity.Latitude);
            para.Add("@Longtitude", entity.Longtitude);

            //string wkt = String.Format("POINT({0} {1})", entity.Longitude, entity.Latitude);
            //DbGeography point = DbGeography.FromText(wkt, 4326);

            Point point = new Point(entity.Longtitude, entity.Latitude) { SRID = 4326 };

            para.Add("@LocationPoint", point);

            return await connection.ExecuteAsync(LocationQueries.Proc_AddLocation, para, commandType: CommandType.StoredProcedure);
        }

        public Task<int> DeleteAsync(Location entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<Location>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Location> GetByID(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Location entity)
        {
            throw new NotImplementedException();
        }

        public virtual void GetDistance(Location entity)
        {

        }

        public Task<List<Location>> GetAllAsync(params Expression<Func<Location, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }
    }
}
