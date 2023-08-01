using Loka.Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Loka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomRepository roomRepository;

        public RoomsController(IRoomRepository _roomRepository)
        {
            this.roomRepository = _roomRepository;
        }

        [HttpGet("{searchString}")]
        public async Task<IActionResult> findRoom(string searchString)
        {
            var rooms = await roomRepository.FindByName(searchString);
            return Ok(rooms);
        }
    }
}