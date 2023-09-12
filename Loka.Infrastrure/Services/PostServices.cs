﻿
using Loka.Infrastructure.Dtos.Posts;
using AutoMapper;
using Loka.Infrastructure.Dtos.Rooms;
using NetTopologySuite.Geometries;
using Loka.Infrastructure.Repositories.Dapper;
using NetTopologySuite.Operation.Distance;
using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;
using Loka.Infrastructure.Dtos.Post;
using Loka.Infrastructure.Repositories.EFCore;
using Loka.Infrastructure.Dtos.Room;
using Loka.Infrastructure.Entities;

namespace Loka.Infrastructure.Services
{
    public class PostServices : IPostServices
    {
        private readonly EFRepositoryBase<Post> _postRepository;
        private IMapper _mapper;
        readonly IDataContext _dapperContext;
        readonly IEFDataContext _efContext;
        Repositories.Photo photoContext;

        public PostServices(EFRepositoryBase<Post> postRepository, IMapper mapper, IDataContext dapperContext, 
            IEFDataContext efContext)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _dapperContext = dapperContext;
            _efContext = efContext;

            //
            photoContext = new Repositories.Photo(_dapperContext, _efContext);
        }

        public async Task<IEnumerable<PostDto>> GetAllByCoordinates(Point targetLocation, double maxDistance)
        {
            var posts = await _postRepository.GetAllAsync(x => x.Room.Location);
            var result = new List<PostDto>();

            foreach (var post in posts)
            {
                var point = new Point(post.Room.Location.Longitude, post.Room.Location.Latitude);
                var distanceOp = new DistanceOp(point, targetLocation);
                var distance = distanceOp.Distance();

                if (distance <= maxDistance)
                {
                    result.Add(_mapper.Map<PostDto>(post));
                }
            }

            result.Sort((PostDto p1, PostDto p2) =>
            {
                if (p1.PostedDate == null && p2.PostedDate == null) return 0;
                else if (p1.PostedDate == null) return -1;
                else if (p2.PostedDate == null) return 1;
                else return p2.PostedDate.CompareTo(p1.PostedDate);
            });
            return result;
        }

        /// <summary>
        /// Lấy hết bài đăng, phòng trả về choa Admin <3
        /// </summary>
        /// <returns>fsegsrgr</returns>
        public async Task<List<GetPostDTO>> GetAll()
        {
            var rooms = await _dapperContext.Rooms.GetAllAsync();

            // Get postDto
            var result = new List<GetPostDTO>();
            
            foreach (var room in rooms)
            {
                var post = _dapperContext.Posts.GetByRoomID(room.RoomID);
                // Get Title
                var title = post.Title;
                var postID = post.PostID;

                // Get ImagesURL
                var pathImgs = _dapperContext.Photos.GetAllPathByRommID(room.RoomID);
                // 
                // Convert to Base64
                List<string> base64URL = photoContext.ImageToBase64(pathImgs.Result);

                // AddressLine1
                var address = _dapperContext.Addressses.GetByRoomID(room.RoomID).AddressLine1;

                if (address == null || post == null)
                    break;

                // Get PostDTO
                result.Add(new GetPostDTO { Title = title, Images = base64URL, Description = room.Description,
                    PostID = postID, AddressLine1 = address , RoomID = room.RoomID});

            }

            return result;
        }

        /// <summary>
        /// Thêm bài đăng (post) mới bởi Admin
        /// </summary>
        /// <param name="post"></param>
        /// <returns></returns>
        public async Task<int> Add(AddPostDTO post)
        {
            // Ward
            var ward = _efContext.Wards.GetByName(post.WardName);

            if(ward == null)
            {
                _efContext.Wards.CreateAsync(
                    new Ward
                    {
                        WardName = post.WardName
                    });

                ward = _efContext.Wards.GetByName(post.WardName);
            }

            //
            var roomID = await _dapperContext.Rooms.CreateAsync(new Room
            {
                User = new User { UserID = 3 },
                Name = "Trọ",
                Description = post.Description,
                Price = post.Price,
                Area = post.Area
            });

            await _dapperContext.Posts.CreateAsync(new Post
            {
                RoomID = roomID,
                Title = post.Title
            });

            // Create Location
            // Create Point
            var gf = NetTopologySuite.NtsGeometryServices.Instance.CreateGeometryFactory(4326);
            var point = gf.CreatePoint(new NetTopologySuite.Geometries.Coordinate(post.Longitude, post.Latitude));

            //
            var room = _efContext.Rooms.GetByID(roomID).Result;

            // Save photo
            await photoContext.Save(post.Images, post.AddressLine1, room);

            //
            _efContext.Locations.CreateAsync(new Infrastrure.Entities.Location
            {
                Longitude = post.Longitude,
                Latitude = post.Latitude,
                PlaceID = post.PlaceID,
                Room = room,
                RoomID = roomID,
                LocationPoint = point,
            });


            return await _dapperContext.Addressses.CreateAsync(new Address
            {
                AddressLine1 = post.AddressLine1,
                AddressLine2 = post.AddressLine2,
                Ward = ward,
                Room = room,
                RoomID = roomID

            });
        }

        public async Task<int> Delete(int postID)
        {
            var room = await _dapperContext.Rooms.GetByPostID(postID);

            await _dapperContext.Photos.DeleteByRoomID(room.RoomID);

            return await _dapperContext.Posts.DeleteAsync(new Post
            {
                PostID = postID

            });
        }

        public async Task<GetPostDTO> Update(GetPostDTO post)
        {
            // Update post
            var postUpdate = await _dapperContext.Posts.UpdateAsync(new Post { PostID = (int)post.RoomID, Title = post.Title });

            // Update Images
            // Get room
            var room = await _dapperContext.Rooms.GetByID((int)post.RoomID);
            // Delete all 
            await _dapperContext.Photos.DeleteByRoomID((int)post.RoomID);
            // Update
            var listPath = await photoContext.Save(post.Images, post.AddressLine1, room);

            // Update room
            await _dapperContext.Rooms.UpdateAsync(new Room
            {
                RoomID = (int)post.RoomID,
                Description = post.Description
            });

            return post;
        }

        // Code bi ngu nen se refact lai sau :<
        //
        public async Task<List<PostDto>> GetAllBySearch(SearchRoomDTO roomDTO)
        {
            List<PostDto> result = new List<PostDto>();
            List<Post> posts = new List<Post>();

            // Case click suggest in the input 
            //
            if(roomDTO.Longitude != 0 && roomDTO.Latitude != 0)
            {
                posts = await _postRepository.GetAllAsync(x => x.Room.Location);

                foreach (var post in posts)
                {
                    var point = new Point(post.Room.Location.Longitude, post.Room.Location.Latitude);
                    var distanceOp = new DistanceOp(point, new Point(roomDTO.Longitude, roomDTO.Latitude));
                    var distance = distanceOp.Distance();

                    if(roomDTO.MaxPrice == 0 && roomDTO.MinPrice == 0)
                    {
                        if (distance <= 5)
                        {
                            result.Add(_mapper.Map<PostDto>(post));
                        }
                    }
                    else
                    if (distance <= 5 && post.Room.Price <= roomDTO.MaxPrice && post.Room.Price >= roomDTO.MinPrice)
                    {
                        result.Add(_mapper.Map<PostDto>(post));
                    }

                }

                //


                result.Sort((PostDto p1, PostDto p2) =>
                {
                    if (p1.PostedDate == null && p2.PostedDate == null) return 0;
                    else if (p1.PostedDate == null) return -1;
                    else if (p2.PostedDate == null) return 1;
                    else return p2.PostedDate.CompareTo(p1.PostedDate);
                });

                return result;
            }
            // Case click search input button
            //
            else
            {
                // Case 1: All three condition: price, search text and near school
                //
                if (roomDTO.MaxPrice != 0 && roomDTO.SchoolId != 0 && roomDTO.WardId != 0)
                {
                    // Get by TEXT RESULT of Input button and by PRICE
                    //
                    var listPosGetByTextResult = _efContext.Posts.GetAllPostsByAddressAndPrice(roomDTO.ResultText, 
                        roomDTO.MinPrice, roomDTO.MaxPrice);

                    // Get by belong WARD
                    var listGetPostByWard = await _postRepository.GetAllAsync(p => p.Room.Address.Ward.WardID == roomDTO.WardId 
                        && p.Room.Price >= roomDTO.MinPrice && p.Room.Price <= roomDTO.MaxPrice);

                    School school = await _efContext.Schools.GetBySchoolID(roomDTO.SchoolId);

                    // This list is PostDTO
                    // Get near School
                    var listPostGetByNearSchool = await GetAllByCoordinates(
                        new Point(school.Location.Longitude, school.Location.Latitude), 5);

                    // Get result
                    //
                    posts.AddRange(listPosGetByTextResult);
                    posts.AddRange(listGetPostByWard);

                    // Map to PostDTO
                    foreach(var post in posts){
                        result.Add(_mapper.Map<PostDto>(post));
                    }
                    // 
                    result.AddRange(listPostGetByNearSchool.ToList());

                    return result;
                }
                else
                // Case 2: Price and school condition
                //
                if (roomDTO.MaxPrice != 0 && roomDTO.SchoolId != 0)
                {
                    // Get by Text Result
                    var listPostGetByTextResult =  _efContext.Posts.GetAllPostsByAddressAndPrice(roomDTO.ResultText,
                        roomDTO.MinPrice, roomDTO.MaxPrice);

                    // Get school
                    School school = await _efContext.Schools.GetBySchoolID(roomDTO.SchoolId);

                    // This list is PostDTO
                    // Get near School
                    var listPostGetByNearSchool = await GetAllByCoordinates(
                        new Point(school.Location.Longitude, school.Location.Latitude), 5);

                    // Get postDTO list
                    posts.AddRange(listPostGetByTextResult);

                    foreach (var post in posts)
                    {
                        result.Add(_mapper.Map<PostDto>(post));
                    }

                    result.AddRange(listPostGetByNearSchool.ToList());
                }
                else
                // Case 3: Price and Ward condition
                if(roomDTO.MaxPrice != 0 && roomDTO.WardId != 0)
                {
                    // Get by TEXT RESULT of Input button and by PRICE
                    //
                    var listPosGetByTextResult = _efContext.Posts.GetAllPostsByAddressAndPrice(roomDTO.ResultText,
                        roomDTO.MinPrice, roomDTO.MaxPrice);

                    // Get by belong WARD
                    var listGetPostByWard = await _postRepository.GetAllAsync(p => p.Room.Address.Ward.WardID == roomDTO.WardId
                        && p.Room.Price >= roomDTO.MinPrice && p.Room.Price <= roomDTO.MaxPrice);
                    
                    // 
                    posts.AddRange(listGetPostByWard.ToList());
                    posts.AddRange(listPosGetByTextResult.ToList());

                    // Get result
                    foreach (var post in posts)
                    {
                        result.Add(_mapper.Map<PostDto>(post));
                    }

                }
                else
                // Case 4: Get by Price
                if(roomDTO.MaxPrice != 0)
                {
                    var listPostGetByPrice = _efContext.Posts.GetAllPostsByAddressAndPrice(roomDTO.ResultText,
                        roomDTO.MinPrice, roomDTO.MaxPrice);

                    posts.AddRange(listPostGetByPrice.ToList());

                    // Get result
                    foreach (var post in posts)
                    {
                        result.Add(_mapper.Map<PostDto>(post));
                    }

                }
                // Case 5: Get by text result
                else
                {
                    var listPost = await _efContext.Posts.GetAllByAddress(roomDTO.ResultText);
                    // Get result
                    foreach (var post in listPost)
                    {
                        result.Add(_mapper.Map<PostDto>(post));
                    }
                }
            }

            return result;
        }

        public async Task<List<PostDto>> GetByPrice(int maxPrice, int minPrice)
        {
            var posts = await _postRepository.GetAllAsync(p => p.Room.Price <= maxPrice && p.Room.Price >= minPrice);
            List<PostDto> result = new List<PostDto>();

            foreach(var post in posts)
            {
                result.Add(_mapper.Map<PostDto>(post));
            }

            return result;
        }
    }
}
