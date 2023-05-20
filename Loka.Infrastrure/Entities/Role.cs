using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Role
    {
        [Key]
        public int RoleID { get; set; }
        public string? RoleName { get; set; }
    }
}
