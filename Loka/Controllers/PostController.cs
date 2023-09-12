using Loka.Infrastructure.Dtos.Post;
using Loka.Infrastructure.Dtos.Posts;
using Loka.Infrastructure.Dtos.Room;
using Loka.Infrastructure.Repositories;
using Loka.Infrastructure.Repositories.Dapper;
using Loka.Infrastructure.Repositories.EFCore;
using Loka.Infrastructure.Services;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;


using NetTopologySuite.Geometries;
using Location = Loka.Infrastrure.Entities.Location;


namespace Loka.Controllers
{
    [ApiController]
    public class PostController : ControllerBase
    {
        readonly IDataContext dapperContext;
        readonly IEFDataContext efDataContext;
        private IPostServices _postServices;
        public PostController(IWebHostEnvironment env, IDataContext dataContext, IEFDataContext context, IPostServices postServices)
        {
            dapperContext = dataContext;
            efDataContext = context;
            _postServices = postServices;

            Infrastructure.Repositories.Photo.environment = env;
        }

        [Route("api/GetAllPostAdmin")]
        [HttpGet]
        public async Task<List<GetPostDTO>> GetPostsAsync()
        {
            return await _postServices.GetAll();
        }

        [Route("api/AddPost")]
        [HttpPost]
        public async Task<int> CreatePostAsync([FromBody] AddPostDTO data)
        {
            return await _postServices.Add(data);
        }

        [Route("api/DeletePostByID")]
        [HttpPost]
        public async Task<int> DeletePostByID([FromBody] int PostID)
        {
            return await _postServices.Delete(PostID);
        }

        [Route("api/UpdatePost")]
        [HttpPut()]
        public async Task<GetPostDTO> UpdatePost(GetPostDTO data)
        {
            return await _postServices.Update(data);
        }

        [Route("api/SearchRoom/{lng}&{lat}")]
        [HttpGet]
        public async Task<IActionResult> SearchRoom(SearchRoomDTO data)
        {
            try
            {
                // Case click button
                //
                
                var point = new Point(data.Longitude, data.Latitude);
                var response = await _postServices.GetAllByCoordinates(point, 5);

                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [Route("api/SuggestRoom/{lng}&{lat}")]
        [HttpGet]
        public async Task<IActionResult> SuggestRoom(double lng, double lat)
        {
            try
            {
                var point = new Point(lng, lat);
                var response = await _postServices.GetAllByCoordinates(point, 5);
                response = response.Take(5).ToList();
                return Ok(response);
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
