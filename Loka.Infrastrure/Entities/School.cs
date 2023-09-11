using Loka.Infrastrure.Entities;
using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastructure.Entities
{
    public class School
    {
        [Key]
        public int SchoolID { get; set; }
        public string SchoolName { get; set; }
        public Ward? Ward { get; set; }
        public Location Location { get; set; }
    }
}
