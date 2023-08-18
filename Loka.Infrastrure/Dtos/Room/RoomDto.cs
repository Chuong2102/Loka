using Loka.Infrastructure.Dtos.Locations;
using Loka.Infrastrure.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Loka.Infrastructure.Dtos.Rooms
{
    public class RoomDto
    {
        public int Id { get; set; }
        public User? User { get; set; }
        public Address? Address { get; set; }
        public LocationDto? Location { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Area { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }

    }

}