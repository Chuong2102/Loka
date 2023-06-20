using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }
        public string? CategoryName { get; set; }
        public string? CategoryDescription { get; set; }
        public int RoomID { get; set; }
    }
}
