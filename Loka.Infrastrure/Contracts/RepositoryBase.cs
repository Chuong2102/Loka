using Loka.Infrastrure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Loka.Infrastructure.Contracts
{
    public abstract class RepositoryBase<T> : IRepositoryBase<T> where T : class
    {
        private readonly DataLokaContext _dbContext;
        private readonly DbSet<T> _table;

        public RepositoryBase(DataLokaContext dbContext)
        {
            _dbContext = dbContext;
            _table = _dbContext.Set<T>();
        }

        public Task<int> CreateAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<int> DeleteAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public Task<List<T>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public IQueryable<T> GetAll()
        {
            return _table.AsQueryable();
        }

        public async Task<List<T>> GetAllAsync(params Expression<Func<T, object>>[] includeProperties)
        {
            var query = GetAll();

            if (includeProperties != null)
            {
                foreach (var includeProperty in includeProperties)
                {
                    query = query.Include(includeProperty);
                }
            }

            return await query.ToListAsync();
        }

        public Task<T> GetByID(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
