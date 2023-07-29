using Loka.Infrastrure.Context;
using Microsoft.EntityFrameworkCore;

namespace Loka.Infrastructure.Contracts
{
    public class EntityRepositoryBase<T> : IEntityRepositoryBase<T> where T : class
    {
        readonly DataLokaContext dataContext;
        public EntityRepositoryBase(DataLokaContext dataLoka)
        {
            this.dataContext = dataLoka;
        }

        public void CreateAsync(T entity)
        {
            dataContext.Add<T>(entity);
        }

        public void DeleteAsync(T entity)
        {
            dataContext.Remove<T>(entity);
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await dataContext.Set<T>().ToListAsync();
        }

        public async Task<T> GetByID(int id)
        {
            return await dataContext.Set<T>().FindAsync(id);
        }

        public void UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }
    }
}
