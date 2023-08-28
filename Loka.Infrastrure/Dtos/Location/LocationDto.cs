using Loka.Infrastrure.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Loka.Infrastructure.Dtos.Locations
{
    public class LocationDto
    {
        public int Id { get; set; }
        public string? PlaceID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public DateTime? CreationTime { get; set; }
        public DateTime? LastModificationTime { get; set; }

    }

}