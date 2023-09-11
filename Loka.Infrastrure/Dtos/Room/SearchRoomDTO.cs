namespace Loka.Infrastructure.Dtos.Room
{
    public class SearchRoomDTO
    {
        public int MinPrice { get; set; }
		public int MaxPrice { get; set; }
		public int WardId { get; set; }
		public int SchoolId { get; set; }
		public string ResultText { get; set; }
		public double Latitude { get; set; }
		public double Longitude { get; set; }

    }
}
