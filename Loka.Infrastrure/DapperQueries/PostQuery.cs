namespace Loka.Infrastructure.DapperQueries
{
    public class PostQuery
    {
        public static string AllPosts => "select * from Posts";
        public static string ProcAddPost => "proc_AddPost";
    }
}
