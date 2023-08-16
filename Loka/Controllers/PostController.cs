using Loka.Infrastructure.Repositories.Dapper;
using Loka.Infrastructure.Repositories.EFCore;
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
        readonly IDataContext dataContext;
        readonly IEFDataContext efDataContext;
        public PostController(IDataContext dataContext, IEFDataContext context)
        {
            this.dataContext = dataContext;
            efDataContext = context;
        }

        public class Data
        {
            // Post
            public int? RoomID { get; set; }
            public int UserID { get; set; }
            public string? Title { get; set; }

            // Room
            public string? Description { get; set; }
            public string? Name { get; set; }
            public double Price { get; set; }
            public double Area { get; set; }

            // Location
            public double Latitude { get; set; }
            public double Longitude { get; set; }
            public string PlaceID { get; set; }

            // Address
            public string AddressLine1 { get; set; }
            public string AddressLine2 { get; set; }
            public string WardName { get; set; }


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

            var ward = efDataContext.Wards.GetByName(data.WardName);

            var roomID = await dataContext.Rooms.CreateAsync(new Room
            {
                User = new User { UserID = 3 },
                Name = "Trọ",
                Description = data.Description,
                Price = data.Price,
                Area = data.Area
            });

            await dataContext.Posts.CreateAsync(new Post
            {
                RoomID = roomID,
                Title = data.Title
            });

            // Create Location
            // Create Point
            var gf = NetTopologySuite.NtsGeometryServices.Instance.CreateGeometryFactory(4326);
            var point = gf.CreatePoint(new NetTopologySuite.Geometries.Coordinate(data.Longitude, data.Latitude));

            //
            var room = efDataContext.Rooms.GetByID(roomID).Result;
            //
            efDataContext.Locations.CreateAsync(new Location
            {
                Longtitude = data.Longitude,
                Latitude = data.Latitude,
                PlaceID = data.PlaceID,
                Room = room,
                RoomID = roomID,
                LocationPoint = point,
            });


            return await dataContext.Addressses.CreateAsync(new Address
            {
                AddressLine1 = data.AddressLine1,
                AddressLine2 = data.AddressLine2,
                Ward = ward,
                Room = room,
                RoomID= roomID

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
