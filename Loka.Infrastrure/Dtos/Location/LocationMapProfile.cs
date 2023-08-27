using AutoMapper;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Dtos.Locations
{
    public class LocationMapProfile : Profile
    {
        public LocationMapProfile()
        {
            CreateMap<Location, LocationDto>().ReverseMap();
            CreateMap<LocationDto, EditLocationDto>();
            CreateMap<CreateLocationDto, Location>();
            CreateMap<EditLocationDto, Location>();

        }
    }
}