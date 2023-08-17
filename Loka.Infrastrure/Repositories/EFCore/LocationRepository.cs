using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;
using NetTopologySuite.Geometries;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public class LocationRepository :  EFRepositoryBase<Infrastrure.Entities.Location>, ILocationRepository
    {
        public LocationRepository(DataLokaContext dbContext) : base(dbContext)
        {

        }
        
    }
}
