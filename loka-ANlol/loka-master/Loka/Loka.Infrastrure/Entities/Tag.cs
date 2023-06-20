using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Tag
    {
        [Key]
        public int TagID { get; set; }
        public string TagName { get; set; }
        public Post Post { get; set; }
    }
}
