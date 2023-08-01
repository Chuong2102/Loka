namespace Loka.Infrastructure.Repositories
{
    public class DataContext : IDataContext
    {
        public IPostRepository Posts { get; set; }
        public IRoomRepository Rooms { get; set; }

        public IAddressRepository Addressses { get; set; }

        public ILocationRepository Locations { get;set; }

        public DataContext(IPostRepository postRepository, IRoomRepository roomRepository,
            IAddressRepository addressRepository, ILocationRepository locationRepository)
        {
            Posts = postRepository;
            Rooms = roomRepository;
            Addressses = addressRepository;
            Locations = locationRepository;
        }
    }
}
