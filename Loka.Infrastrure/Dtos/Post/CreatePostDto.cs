using Loka.Infrastructure.Dtos.Favorite;
using Loka.Infrastructure.Dtos.Rooms;
using Loka.Infrastrure.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Loka.Infrastructure.Dtos.Posts
{
    public class CreatePostDto
    {
        public int Id { get; set; }
        public CreateRoomDto? Room { get; set; }
        public string Title { get; set; }
    }

}