using Loka.Infrastructure.DapperQueries;
using Loka.Infrastrure.Entities;
using Microsoft.Data.SqlClient;
using System.Data;
using Dapper;
using static Dapper.SqlMapper;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using NetTopologySuite.Geometries;
using Loka.Infrastructure.Dtos.Rooms;
using Loka.Infrastructure.Dtos.Posts;

namespace Loka.Infrastructure.Services
{
    public interface IPostServices
    {
        Task<IEnumerable<PostDto>> GetAllByCoordinates(Point targetLocation, double maxDistance);

    }
}
