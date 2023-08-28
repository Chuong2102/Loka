using Loka.Infrastructure.Dtos.Favorite;
using Loka.Infrastructure.Dtos.Rooms;

namespace Loka.Infrastructure.Dtos.Posts
{
    public class PostDto
    {
        public int Id { get; set; }
        public int RoomId { get; set; }
        public RoomDto? Room { get; set; }
        public string Title { get; set; }
        public DateTime PostedDate { get; set; }
        public ICollection<FavoriteDto>? Favorites { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }

    }

}