using Loka.Infrastructure.Repositories;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;

namespace Loka.Controllers
{
    [ApiController]
    public class PostController : ControllerBase
    {
        IDataContext dataContext;
        DataLokaContext dataLokaContext;
        public PostController(IDataContext dataContext, DataLokaContext context)
        {
            this.dataContext = dataContext;
            dataLokaContext = context;
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

        [Route("api/GetAllPost")]
        [HttpGet]
        public async Task<List<Post>> GetPostsAsync()
        {
            return await dataContext.Posts.GetAllAsync();
        }

        [Route("api/AddPost")]
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

        [Route("api/DeletePostByID")]
        [HttpPost]
        public async Task<int> DeletePostByID([FromBody] int PostID)
        {
            return await dataContext.Posts.DeleteAsync(new Post
            {
                PostID = PostID

            });
        }

        [Route("api/UpdatePost")]
        [HttpPost]
        public async Task<int> UpdatePost([FromBody] Data data)
        {

            var Post = await dataContext.Posts.UpdateAsync(new Post { PostID = (int)data.RoomID, Title = data.Title });
            return await dataContext.Rooms.UpdateAsync(new Room
            {
                RoomID = (int)data.RoomID,
                Name = data.Name,
                Description = data.Description,
                Price = data.Price,
                Area = data.Area
            });
        }
    }
}
