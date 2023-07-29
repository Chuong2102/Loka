namespace Loka.Infrastructure.DapperQueries
{
    public class RoomQuery
    {
        public static string AllRooms => "select * from Rooms";
        public static string ProcAddRoom => "proc_AddRoom";
        public static string Proc_UpdateRoom = "proc_UpdateRoom";
    }
}
