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
    public class PostRepository : IPostRepository
    {
        private readonly IConfiguration configuration;
        private DataLokaContext dbContext;

        private readonly string connectionString = "ConnectionStringName";

        public PostRepository(IConfiguration configuration, DataLokaContext context)
        {
            this.configuration = configuration;
            dbContext = context;
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

        public Task<Post> GetByID(int id)
        {
            throw new NotImplementedException();
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

        public Task<List<Post>> GetAllAsync(params Expression<Func<Post, object>>[] includeProperties)
        {
            throw new NotImplementedException();
        }
    }
}
