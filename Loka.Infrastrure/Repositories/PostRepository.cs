using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using static Dapper.SqlMapper;
using Loka.Infrastructure.Contracts;

namespace Loka.Infrastructure.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly IConfiguration configuration;
        public PostRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public async Task<int> CreateAsync(Post entity)
        {
            using IDbConnection connection = new SqlConnection(configuration.GetConnectionString("ConnectionStringName"));
            connection.Open();

            var para = new DynamicParameters();

            para.Add("@RoomID", entity.RoomID);
            para.Add("@Title", entity.Title);

            return await connection.ExecuteAsync(PostQuery.ProcAddPost, para, commandType: CommandType.StoredProcedure);
        }

        public async Task<List<Post>> GetAllAsync()
        {
            using (IDbConnection connection = new SqlConnection(configuration.GetConnectionString("ConnectionStringName")))
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

        Task<int> IRepositoryBase<Post>.DeleteAsync(Post entity)
        {
            throw new NotImplementedException();
        }

        Task<int> IRepositoryBase<Post>.UpdateAsync(Post entity)
        {
            throw new NotImplementedException();
        }
    }
}
