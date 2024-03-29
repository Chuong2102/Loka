﻿namespace Loka.Infrastructure.Repositories.Dapper
{
    public class DataContext : IDataContext
    {
        public IPostRepository Posts { get; set; }
        public IRoomRepository Rooms { get; set; }
        public IAddressRepository Addressses { get; set; }
        public ILocationRepository Locations { get; set; }
        public IPhotoRepository Photos { get; set; }
        public IWardRepository Wards { get; set; }

        public DataContext(IPostRepository postRepository, IRoomRepository roomRepository,
            IAddressRepository addressRepository, ILocationRepository locationRepository,
            IPhotoRepository photos, IWardRepository wards)
        {
            Posts = postRepository;
            Rooms = roomRepository;
            Addressses = addressRepository;
            Locations = locationRepository;
            Photos = photos;
            Wards = wards;
        }
    }
}
