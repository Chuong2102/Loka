using Dapper;
using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using System.Data;
using Microsoft.Data.SqlClient;
using static Dapper.SqlMapper;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly IConfiguration configuration;

        private readonly string connectionString = "ConnectionStringName";

        public PhotoRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<int> CreateAsync(Infrastrure.Entities.Photo entity)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            var para = new DynamicParameters();

            para.Add("@Description", entity.Description);
            para.Add("@Title", entity.Title);
            para.Add("@Path", entity.Path);
            para.Add("@RoomID", entity.Room.RoomID);


            return await connection.ExecuteAsync(PhotoQuery.proc_AddPhoto, para, commandType: CommandType.StoredProcedure);
        }

        public Task<int> DeleteAsync(Infrastrure.Entities.Photo entity)
        {
            throw new NotImplementedException();
        }

        public async Task DeleteByRoomID(int roomID)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"delete from Photos where RoomID = " + roomID.ToString();

            var photos = await connection.QueryAsync(sql);
        }

        public Task<List<Infrastrure.Entities.Photo>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<List<string>> GetAllBase64ByRommID(int roomID)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"select Base64String from Photos where RoomID = " + roomID.ToString();

            var photos = await connection.QueryAsync<Infrastrure.Entities.Photo>(sql);

            List<string> paths = new List<string>();
            foreach (var photo in photos)
            {
                paths.Add(photo.Path);
            }

            return paths;
        }

        public async Task<List<Infrastrure.Entities.Photo>> GetAllByRoomID(int roomID)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            var para = new DynamicParameters();

            para.Add("@RoomID", roomID);


            var result = await connection.QueryAsync<Infrastrure.Entities.Photo>(
                PhotoQuery.proc_GetPhotoByRoomID, para, commandType: CommandType.StoredProcedure);

            return result.ToList();
        }

        public async Task<List<string>> GetAllPathByRommID(int roomID)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"select Path from Photos where RoomID = " + roomID.ToString();

            var photos = await connection.QueryAsync<Infrastrure.Entities.Photo>(sql);

            List<string> paths = new List<string>();
            foreach (var photo in photos)
            {
                paths.Add(photo.Path);
            }

            return paths;
        }

        public Task<Infrastrure.Entities.Photo> GetByID(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Infrastrure.Entities.Photo entity)
        {
            throw new NotImplementedException();
        }
    }
}
