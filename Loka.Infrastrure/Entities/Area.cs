using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Area
    {
        [Key]
        public int AreaID { get; set; }
        public Category Category { get; set; }
        public double AreaNumber { get; set; }

    }
}
