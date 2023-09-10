using AutoMapper;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Dtos.Posts
{
    public class PostMapProfile : Profile
    {
        public PostMapProfile()
        {
            CreateMap<Loka.Infrastrure.Entities.Post, PostDto>().ReverseMap();
            CreateMap<PostDto, EditPostDto>();
            CreateMap<CreatePostDto, Infrastrure.Entities.Post>();
            CreateMap<EditPostDto, Infrastrure.Entities.Post>();
            CreateMap<CreatePostDto, Infrastrure.Entities.Post>();
        }
    }
}