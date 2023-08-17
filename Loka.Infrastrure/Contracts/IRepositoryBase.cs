using System.Linq.Expressions;

namespace Loka.Infrastructure.Contracts
{
    public interface IRepositoryBase<T> where T : class
    {
        Task<int> CreateAsync(T entity);
        Task<List<T>> GetAllAsync();
        Task<List<T>> GetAllAsync(params Expression<Func<T, object>>[] includeProperties);
        Task<T> GetByID(int id);
        Task<int> UpdateAsync(T entity);
        Task<int> DeleteAsync(T entity);

    }
}
