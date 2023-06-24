using System.ComponentModel.DataAnnotations;

namespace Loka.Infrastrure.Entities
{
    public class Price
    {
        [Key]
        public int Id { get; set; }
        public Category Category { get; set; }
        public int PriceNumber { get; set; }
    }
}
