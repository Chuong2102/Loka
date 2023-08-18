using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastructure.Dtos.Favorite
{
    public class FavoriteDto
    {
        public int Id { get; set; }
        //public User? User { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}
