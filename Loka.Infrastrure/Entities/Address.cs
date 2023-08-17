using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace Loka.Infrastrure.Entities
{
    public class Address
    {
        [Key]
        public int AddressID { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string? PostalCare { get; set; }
        public Room? Room { get; set; }
        public Ward? Ward { get; set; }
        public int RoomID { get; set; }
    }
}
