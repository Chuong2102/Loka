using Loka.Infrastrure.Entities;
using NetTopologySuite.Geometries;
using System;
using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastructure.Dtos.Locations
{
    public class EditLocationDto
    {
        public int Id { get; set; }
        public string? PlaceID { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public Infrastrure.Entities.Room? Room { get; set; }
        public int RoomID { get; set; }
        public Point LocationPoint { get; set; }
        public DateTime? CreationTime { get; set; }
    }
}