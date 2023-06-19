namespace Loka.Infrastructure.Repositories
{
    public interface IDataContext
    {
        IPostRepository Posts { get; }
        IRoomRepository Rooms{ get; }
    }
}
