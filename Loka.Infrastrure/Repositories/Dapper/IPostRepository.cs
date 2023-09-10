using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public interface IPostRepository : IRepositoryBase<Post>
    {
        string GetTitleByRoomID(int roomID);
        Post GetByRoomID(int roomID);
    }
}
