namespace Loka.Infrastructure.Repositories
{
    public class DataContext : IDataContext
    {
        public IPostRepository Posts { get; set; }
        public IRoomRepository Rooms { get; set; }
        public DataContext(IPostRepository postRepository, IRoomRepository roomRepository)
        {
            Posts = postRepository;
            Rooms = roomRepository;
        }
    }
}
