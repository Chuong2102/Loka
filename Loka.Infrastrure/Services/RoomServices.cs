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

        public async Task<IEnumerable<RoomDto>> GetAllByCoordinates(Point targetLocation, double maxDistance)
        {
            var rooms = await _roomRepository.GetAllAsync(x => x.Location);
            var result = new List<RoomDto>();
            foreach (var room in rooms)
            {
                var point = new Point(room.Location.Longitude, room.Location.Latitude);
                var distanceOp = new DistanceOp(point, targetLocation);
                var distance = distanceOp.Distance();

                if (distance <= maxDistance)
                {
                    result.Add(_mapper.Map<RoomDto>(room));
                }
            }
            return result;
        }
    }
}
