using Loka.Infrastructure.Dtos.Favorite;
using Loka.Infrastructure.Dtos.Rooms;
using System;

namespace Loka.Infrastructure.Dtos.Posts
{
    public class EditPostDto
    {
        public int Id { get; set; }
        public EditRoomDto? Room { get; set; }
        public string Title { get; set; }
        public DateTime? CreationTime { get; set; }
    }
}