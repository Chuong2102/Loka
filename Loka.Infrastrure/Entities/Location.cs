using NetTopologySuite.Geometries;
using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Location
    {
        [Key]
        public int LocationID { get; set; }
        public string? PlaceID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Room? Room { get; set; }
        public int RoomID { get; set; }
        public Point LocationPoint { get; set; }
    }
}
