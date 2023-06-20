using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class City
    {
        [Key]
        public int CityID { get; set; }
        public string? CityName { get; set; }

    }
}
