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
    public class CreateRoomDto
    {
        public int? UserId { get; set; }
        public int? AddressId { get; set; }
        public int? LocationId { get; set; }
        public int? PostId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Area { get; set; }
    }

}