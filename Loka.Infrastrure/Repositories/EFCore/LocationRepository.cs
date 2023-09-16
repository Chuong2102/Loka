using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using Microsoft.EntityFrameworkCore;
using NetTopologySuite.Geometries;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public class LocationRepository :  EFRepositoryBase<Infrastrure.Entities.Location>, ILocationRepository
    {
        DataLokaContext _conetxt;
        public LocationRepository(DataLokaContext dbContext) : base(dbContext)
        {
            _conetxt = dbContext;
        }

        public double GetLatByRoomID(int roomID)
        {
            var lati = _conetxt.Locations.Include(l => l.Room).Where(l => l.Room.RoomID == roomID).FirstOrDefault().Latitude;
            return lati;
        }

        public double GetLongiByRoomID(int roomID)
        {
            var longi = _conetxt.Locations.Include(l => l.Room).Where(l => l.Room.RoomID == roomID).FirstOrDefault().Longitude;
            return longi;
        }
    }
}
