using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Favorite
    {
        [Key]
        public int FavoriteID { get; set; }
        public DateTime CreatedTime { get; set; }
        public User? User { get; set; }
        public int UserID { get; set; }
        public virtual ICollection<Post> Posts { get; set; }
    }
}
