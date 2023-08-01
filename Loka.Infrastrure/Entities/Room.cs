using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Room
    {
        [Key]
        public int RoomID { get; set; }

        public User? User { get; set; }
        public virtual Address? Address { get; set; }
        public int? AddressId { get; set; }
        public Location? Location { get; set; }
        public Post Post { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Area { get; set; }
    }
}