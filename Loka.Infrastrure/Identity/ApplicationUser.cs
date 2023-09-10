using Microsoft.AspNetCore.Identity;

namespace Loka.Infrastructure.Identity
{
    public class ApplicationUser : IdentityUser
    {
        public DateTime RegistrationDate { get; set; }
        public string? FullName { get; set; }
    }
}
