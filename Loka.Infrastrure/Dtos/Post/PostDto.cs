using Loka.Infrastructure.Dtos.Favorite;
using Loka.Infrastructure.Dtos.Rooms;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Dtos.Posts
{
    public class PostDto
    {
        public int PostID { get; set; }
        public int RoomID { get; set; }
        public RoomDto? Room { get; set; }
        public string Title { get; set; }
        public DateTime PostedDate { get; set; }
        public ICollection<FavoriteDto>? Favorites { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }

    }

}