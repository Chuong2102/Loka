using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public DateTime RegistrationDate { get; set; }
        public Account? Account { get; set; }
        public Role? Role { get; set; }
        public Favorite? Favorite { get; set; }
    }
}
