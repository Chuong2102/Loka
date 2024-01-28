using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using static Dapper.SqlMapper;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using NetTopologySuite.Geometries;
using Loka.Infrastructure.Dtos.Rooms;
using Loka.Infrastructure.Dtos.Posts;
using Loka.Infrastructure.Dtos.Post;
using Loka.Infrastructure.Dtos.Room;

namespace Loka.Infrastructure.Services
{
    /// <summary>
    /// Service cho Post
    /// </summary>
    public interface IPostServices
    {
        Task<IEnumerable<PostDto>> GetAllByCoordinates(Point targetLocation, double maxDistance);
        Task<List<GetPostDTO>> GetAll();
        Task<List<GetPostDTO>> GetAllByPage(int limit, int page);
        Task<List<GetPostDTO>> GetAllByAdmin();
        Task<int> Add(AddPostDTO post);
        Task<int> Delete(int id);
        Task<GetPostDTO> Update(GetPostDTO postID);
        Task<List<PostDto>> Search(SearchRoomDTO roomDTO);
        Task<List<GetPostDTO>> GetAllBySearch(SearchRoomDTO roomDTO);
        Task<IEnumerable<GetPostDTO>> GetAllByCoordinatesToDTO(Point targetLocation, double maxDistance);
        Task<List<PostDto>> GetByPrice(int maxPrice, int minPrice);
        Task<GetPostDTO> Detail(int id);
        Task<List<GetPostDTO>> Suggest(double longitude, double latitude);
    }
}
