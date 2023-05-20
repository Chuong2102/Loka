using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Ward
    {
        [Key]
        public int WardID { get; set; }
        public string? WardName { get; set; }
        public City? City { get; set; }
    }
}
