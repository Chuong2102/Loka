using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using static Dapper.SqlMapper;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public class PostRepository : IPostRepository
    {
        private readonly IConfiguration configuration;
        private DataLokaContext _dbContext;

        private readonly string connectionString = "ConnectionStringName";

        public PostRepository(IConfiguration configuration, DataLokaContext context)
        {
            this.configuration = configuration;
            _dbContext = context;
        }

        public async Task<int> CreateAsync(Post entity)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            var para = new DynamicParameters();

            para.Add("@RoomID", entity.RoomID);
            para.Add("@Title", entity.Title);

            return await connection.ExecuteAsync(PostQuery.Proc_AddPost, para, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<Post>> GetAllAsync()
        {
            using (IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString)))
            {
                connection.Open();
                var result = await connection.QueryAsync<Post>(PostQuery.AllPosts);

                return result.ToList();
            }
        }

        public async Task<Post> GetByID(int id)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"select * from Posts where PostID = " + id.ToString();

            var post = await connection.QuerySingleAsync<Post>(sql);

            return post;
        }

        async Task<int> IRepositoryBase<Post>.DeleteAsync(Post entity)
        {
            using (IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString)))
            {
                connection.Open();

                var para = new DynamicParameters();

                para.Add("@PostID", entity.PostID);

                return await connection.ExecuteAsync(PostQuery.Proc_DeletePost, para, commandType: CommandType.StoredProcedure);
            }
        }

        async Task<int> IRepositoryBase<Post>.UpdateAsync(Post entity)
        {
            using (IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString)))
            {
                connection.Open();

                var para = new DynamicParameters();

                // Post
                para.Add("@RoomID", entity.PostID);
                para.Add("@Title", entity.Title);

                return await connection.ExecuteAsync(PostQuery.Proc_UpdatePost, para, commandType: CommandType.StoredProcedure);
            }
        }

        public string GetTitleByRoomID(int roomID)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"select * from Posts where RoomID = " + roomID.ToString();

            var post = connection.QuerySingle<Post>(sql);

            return post.Title;
        }

        public Post GetByRoomID(int roomID)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString(connectionString));
            connection.Open();

            string sql = @"select * from Posts where RoomID = " + roomID.ToString();

            var post = connection.QuerySingle<Post>(sql);

            return post;
        }
    }
}
