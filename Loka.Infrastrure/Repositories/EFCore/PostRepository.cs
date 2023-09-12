using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public class PostRepository : EFRepositoryBase<Post>, IPostRepository
    {
        DataLokaContext _context;
        public PostRepository(DataLokaContext dataLoka) : base(dataLoka)
        {
            _context = dataLoka;
        }

        public async Task<List<Post>> GetAllByAddress(string addressLine)
        {
            List<Post> posts = new List<Post>();
            
            // Get post contain addressLine and Include Room
            var rooms = _context.Rooms.Include(r => r.Address).Include(r => r.Post).Where(
                r => r.Address.AddressLine1.Contains(addressLine)).ToList();

            foreach (var room in rooms)
            {
                posts.Add(new Post
                {
                    PostID = room.Post.PostID,
                    RoomID = room.RoomID,
                    Title = room.Post.Title,
                    Room = room
                });
            }

            return posts;
        }

        public List<Post> GetAllPostsByAddressAndPrice(string addressLine, int minPrice, int maxPrice)
        {
            List<Post> posts = new List<Post>();

            // Get post contain addressLine and Include Room
            var rooms = _context.Rooms.Include(r => r.Address).Include(r => r.Post).Where(
                r => r.Address.AddressLine1.Contains(addressLine)).ToList();

            foreach (var room in rooms)
            {
                if(room.Price >= minPrice && room.Price <= maxPrice)
                    posts.Add(new Post
                    {
                        PostID = room.Post.PostID,
                        RoomID = room.RoomID,
                        Title = room.Post.Title,
                        Room = room
                    });
            }

            return posts;
        }
    }
}
