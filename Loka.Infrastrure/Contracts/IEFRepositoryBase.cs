using System.Linq.Expressions;

namespace Loka.Infrastructure.Contracts
{
    public interface IEFRepositoryBase<T> where T : class
    {
        void CreateAsync(T entity);
        Task<List<T>> GetAllAsync();
        Task<List<T>> GetAllAsync(params Expression<Func<T, object>>[] includeProperties);
        IQueryable<T> GetAll();
        void UpdateAsync(T entity);
        void DeleteAsync(T entity);
    }
}
