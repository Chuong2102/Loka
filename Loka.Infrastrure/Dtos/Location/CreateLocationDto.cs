using Loka.Infrastrure.Entities;
using NetTopologySuite.Geometries;
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
    public class CreateLocationDto
    {
        public string? PlaceID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int RoomID { get; set; }
        public Point LocationPoint { get; set; }
    }

}