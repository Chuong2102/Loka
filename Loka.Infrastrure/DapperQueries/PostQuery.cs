namespace Loka.Infrastructure.DapperQueries
{
    public class PostQuery
    {
        public static string AllPosts => "select * from Posts";
        public static string Proc_AddPost => "proc_AddPost";
        public static string Proc_DeletePost => "proc_DeletePost";
        public static string Proc_UpdatePost => "proc_UpdatePost";
    }
}
