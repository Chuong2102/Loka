using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Photo
    {
        [Key]
        public int PhotoId { get; set; }
        public Room? Room { get; set; }
        public string? Path { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? CreatedTime { get; set; }

    }
}
