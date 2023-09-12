using AutoMapper;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Dtos.Rooms
{
    public class RoomMapProfile : Profile
    {
        public RoomMapProfile()
        {
            CreateMap<Infrastrure.Entities.Room, RoomDto>().ReverseMap();
            CreateMap<RoomDto, EditRoomDto>();
            CreateMap<CreateRoomDto, Infrastrure.Entities.Room>();
            CreateMap<EditRoomDto, Infrastrure.Entities.Room>();

        }
    }
}