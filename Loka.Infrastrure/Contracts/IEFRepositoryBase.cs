namespace Loka.Infrastructure.Contracts
{
    public interface IEFRepositoryBase<T> where T : class
    {
        void CreateAsync(T entity);
        Task<List<T>> GetAllAsync();
        void UpdateAsync(T entity);
        void DeleteAsync(T entity);
    }
}
