using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Loka.Infrastrure.Entities
{
    public class Account
    {
        [Key]
        public int AccountID { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public User? User { get; set; }
        public int UserID { get; set; }
    }
}
