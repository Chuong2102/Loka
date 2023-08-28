using AutoMapper;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Dtos.Rooms
{
    public class RoomMapProfile : Profile
    {
        public RoomMapProfile()
        {
            CreateMap<Room, RoomDto>().ReverseMap();
            CreateMap<RoomDto, EditRoomDto>();
            CreateMap<CreateRoomDto, Room>();
            CreateMap<EditRoomDto, Room>();

        }
    }
}