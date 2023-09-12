using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public interface IPhotoRepository : IRepositoryBase<Infrastrure.Entities.Photo>
    {
        Task<List<Infrastrure.Entities.Photo>> GetAllByRoomID(int roomID);
        Task<List<string>> GetAllPathByRommID(int roomID);
        Task<List<string>> GetAllBase64ByRommID(int roomID);
        Task DeleteByRoomID(int roomID);
    }
}
