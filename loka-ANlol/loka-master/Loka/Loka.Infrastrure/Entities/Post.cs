using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Post
    {
        [Key]
        public int PostID { get; set; }
        public Room? Room { get; set; }
        public int RoomID { get; set; }
        public string? Title { get;set; }
        public DateTime PostedDate { get; set; }
        public virtual ICollection<Favorite> Favorites { get; set; }
    }
}
