using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;

namespace Loka.Infrastructure.Repositories
{
    public class PostRepository : IPostRepository
    {
        private readonly IConfiguration configuration;
        public PostRepository(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public Task<Post> CreateAsync(Post entity)
        {
            throw new NotImplementedException();
        }

        public Task<Post> DeleteAsync(Post entity)
        {
            throw new NotImplementedException();
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

        public Task<Post> UpdateAsync(Post entity)
        {
            throw new NotImplementedException();
        }
    }
}
