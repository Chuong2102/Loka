using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using static Dapper.SqlMapper;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using Loka.Infrastructure.Repositories;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Mapbox.AspNetCore.Models;
using NetTopologySuite.Geometries;
using Location = NetTopologySuite.Geometries.Location;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Operation.Distance;
using Loka.Infrastructure.Dtos.Rooms;
using AutoMapper;
using Loka.Infrastructure.Repositories.Dapper;

namespace Loka.Infrastructure.Services
{
    public class RoomServices : IRoomServices
    {
        private readonly IRoomRepository _roomRepository;
        private IMapper _mapper;

        public RoomServices(IRoomRepository roomRepository, IMapper mapper)
        {
            _roomRepository = roomRepository;
            _mapper = mapper;
        }

       
    }
}
