using Loka.Infrastructure.Repositories;
using Loka.Infrastructure.Repositories.Dapper;
using Loka.Infrastructure.Services;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using NetTopologySuite.Geometries;
using System.ComponentModel;

namespace Loka.Controllers
{
    [ApiController]
    public class RoomController : ControllerBase
    {
        IDataContext dataContext;
        private readonly IRoomServices _roomServices;
        public RoomController(IDataContext dataContext, IRoomServices roomServices)
        {
            this.dataContext = dataContext;
            this._roomServices = roomServices;
        }

        
    }
}
