namespace Loka.Infrastructure.Dtos.Post
{   public class GetPostDTO
    {
        public int PostID { get; set; }
        public int RoomID { get; set; }
        public string? Title { get; set; }
        public string? AddressLine1 { get; set; }
        public string? Description { get; set; }
        public List<string>? Images { get; set; }
        public string? WardName { get; set; }
        public double Price { get;set; }
        public double? Latitude { get; set; }
        public double? Longitude { get; set; }

    }
}
