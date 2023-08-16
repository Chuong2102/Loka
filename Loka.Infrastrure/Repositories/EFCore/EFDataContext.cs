﻿using Loka.Infrastrure.Context;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public class EFDataContext : IEFDataContext
    {
        private readonly DataLokaContext context;

        public EFDataContext(DataLokaContext context)
        {
            this.context = context;

            Locations = new LocationRepository(context);
            Wards = new WardRepository(context);
            Rooms = new RoomRepository(context);
        }
        public ILocationRepository Locations {get; private set;}

        public IWardRepository Wards {get ; private set;}

        public IRoomRepository Rooms { get; private set;}

        public void Dispose()
        {
            context.Dispose();
        }
    }
}
