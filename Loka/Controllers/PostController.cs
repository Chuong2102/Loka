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
        private IPostServices _postServices;
        public PostController(IWebHostEnvironment env, IPostServices postServices)
        {
            _postServices = postServices;

            Infrastructure.Repositories.Photo.environment = env;
        }


        [Route("api/GetAllPostAdmin")]
        [HttpGet]
        public async Task<List<GetPostDTO>> GetPostsAdminAsync()
        {
            return await _postServices.GetAllByAdmin();
        }

        [Route("api/GetAllPost")]
        [HttpGet]
        public async Task<List<GetPostDTO>> GetPostsAsync(int limit, int page)
        {
            return await _postServices.GetAllByPage(limit, page);
        }

        [Route("api/Detail")]
        [HttpGet]
        public async Task<GetPostDTO> Detail(int id)
        {
            return await _postServices.Detail(id);
        }

        [Route("api/AddPost")]
        [HttpPost]
        public async Task<int> CreatePostAsync([FromBody] AddPostDTO data)
        {
            return await _postServices.Add(data);
        }

        [Route("api/DeletePostByID")]
        [HttpDelete]
        public async Task<int> DeletePostByID(int id)
        {
            return await _postServices.Delete(id);
        }

        [Route("api/UpdatePost")]
        [HttpPut()]
        public async Task<GetPostDTO> UpdatePost(GetPostDTO data)
        {
            return await _postServices.Update(data);
        }

        [Route("api/SearchRoom")]
        [HttpPost]
        public async Task<List<GetPostDTO>> SearchRoom(SearchRoomDTO data)
        {
            return await _postServices.GetAllBySearch(data);
        }

        [Route("api/SuggestRoom/{lng}&{lat}")]
        [HttpGet]
        public async Task<IActionResult> SuggestRoom(double lng, double lat)
        {
            var posts = await _postServices.Suggest(lng, lat);

            return Ok(posts);
        }
    }
}
