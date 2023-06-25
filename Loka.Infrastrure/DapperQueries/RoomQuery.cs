namespace Loka.Infrastructure.DapperQueries
{
    public class RoomQuery
    {
        public static string AllRooms => "select * from Rooms";
        public static string ProcAddRoom => "proc_AddRoom";
    }
}
