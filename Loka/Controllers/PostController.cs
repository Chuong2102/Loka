using Loka.Infrastructure.Repositories;
using Loka.Infrastrure.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace Loka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        IDataContext dataContext;
        public PostController(IDataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public class Data
        {
            public int? RoomID { get; set; }
            public int UserID { get; set; }
            public string? Title { get; set; }
            public string? Description { get; set; }
            public string? Name { get; set; }
            public double Price { get; set; }
            public double Area { get; set; }
        }

        [HttpGet]
        public async Task<List<Post>> GetPostsAsync()
        {
            return await dataContext.Posts.GetAllAsync();
        }

        [HttpPost]
        public async Task<int> CreatePostAsync([FromBody] Data data)
        {
            var roomID = await dataContext.Rooms.CreateAsync(new Room
            {
                User = new User { UserID = data.UserID},
                Name = data.Name,
                Description = data.Description,
                Price = data.Price,
                Area = data.Area
            });

            return await dataContext.Posts.CreateAsync(new Post
            {
                RoomID = roomID,
                Title = data.Title
            });
        }
    }
}
