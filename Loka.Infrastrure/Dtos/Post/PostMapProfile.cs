using AutoMapper;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Dtos.Posts
{
    public class PostMapProfile : Profile
    {
        public PostMapProfile()
        {
            CreateMap<Post, PostDto>().ReverseMap();
            CreateMap<PostDto, EditPostDto>();
            CreateMap<CreatePostDto, Post>();
            CreateMap<EditPostDto, Post>();

        }
    }
}