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

        [HttpGet]
        public async Task<List<Post>> GetPostsAsync()
        {
            return await dataContext.Posts.GetAllAsync();
        }
    }
}
