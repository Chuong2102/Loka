namespace Loka.Infrastructure.Contracts
{
    public interface IRepositoryBase<T> where T : class
    {
        Task<int> CreateAsync(T entity);
        Task<List<T>> GetAllAsync();
        Task<T> GetByID(int id);
        Task<int> UpdateAsync(T entity);
        Task<int> DeleteAsync(T entity);

    }
}
