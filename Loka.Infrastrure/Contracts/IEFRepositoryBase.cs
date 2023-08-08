namespace Loka.Infrastructure.Contracts
{
    public interface IEFRepositoryBase<T> where T : class
    {
        void CreateAsync(T entity);
        Task<List<T>> GetAllAsync();
        Task<T> GetByID(int id);
        void UpdateAsync(T entity);
        void DeleteAsync(T entity);
    }
}
