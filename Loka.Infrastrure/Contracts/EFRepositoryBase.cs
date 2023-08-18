using Loka.Infrastrure.Context;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Loka.Infrastructure.Contracts
{
    public class EFRepositoryBase<T> : IEFRepositoryBase<T> where T : class
    {
        readonly DataLokaContext _dataContext;
        private readonly DbSet<T> _table;
        public EFRepositoryBase(DataLokaContext dataLoka)
        {
            _dataContext = dataLoka;
            _table = _dataContext.Set<T>();
        }

        public async void CreateAsync(T entity)
        {
            await _dataContext.AddRangeAsync(entity);
            _dataContext.SaveChanges();
        }

        public void DeleteAsync(T entity)
        {
            _dataContext.Remove<T>(entity);
            _dataContext.SaveChanges();
        }
        public IQueryable<T> GetAll()
        {
            return _table.AsQueryable();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await _dataContext.Set<T>().ToListAsync();
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

        public void UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }

    }
}
