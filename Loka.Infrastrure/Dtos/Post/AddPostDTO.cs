namespace Loka.Infrastructure.Dtos.Post
{
    public class AddPostDTO
    {
        // Post
        public int RoomID { get; set; }
        public int? UserID { get; set; }
        public string Title { get; set; }

        // Room
        public string Description { get; set; }
        public string? Name { get; set; }
        public double Price { get; set; }
        public double Area { get; set; }

        // Location
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string? PlaceID { get; set; }

        // Address
        public string AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public string WardName { get; set; }

        // Images
        public List<string> Images { get; set; }


    }
}
