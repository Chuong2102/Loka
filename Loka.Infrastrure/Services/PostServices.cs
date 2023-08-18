
using Loka.Infrastructure.Dtos.Posts;
using AutoMapper;
using Loka.Infrastructure.Dtos.Rooms;
using NetTopologySuite.Geometries;
using Loka.Infrastructure.Repositories.Dapper;
using NetTopologySuite.Operation.Distance;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Services
{
    public class PostServices : IPostServices
    {
        private readonly EFRepositoryBase<Post> _postRepository;
        private readonly EFRepositoryBase<Room> _roomRepository;
        private IMapper _mapper;

        public PostServices(EFRepositoryBase<Post> postRepository, IMapper mapper, EFRepositoryBase<Room> roomRepository)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _roomRepository = roomRepository;
        }

        public async Task<IEnumerable<PostDto>> GetAllByCoordinates(Point targetLocation, double maxDistance)
        {
            var posts = await _postRepository.GetAllAsync(x => x.Room.Location);
            var result = new List<PostDto>();
            foreach (var post in posts)
            {
                var point = new Point(post.Room.Location.Longitude, post.Room.Location.Latitude);
                var distanceOp = new DistanceOp(point, targetLocation);
                var distance = distanceOp.Distance();

                if (distance <= maxDistance)
                {
                    result.Add(_mapper.Map<PostDto>(post));
                }
            }
            return result;
        }

    }
}
