using System;

namespace Loka.Infrastructure.Dtos.Rooms
{
    public class EditRoomDto
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? AddressId { get; set; }
        public int? LocationId { get; set; }
        public int? PostId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Area { get; set; }
        public DateTime? CreationTime { get; set; }
    }
}