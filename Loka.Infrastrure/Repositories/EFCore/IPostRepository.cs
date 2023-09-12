﻿using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public interface IPostRepository : IEFRepositoryBase<Post>
    {
        List<Post> GetAllPostsByAddressAndPrice(string addressLine, int minPrice, int maxPrice);
        Task<List<Post>> GetAllByAddress(string addressLine);
        Task<List<Post>> GetAllByWardIDAndPrice(int wardID);
        Task<List<Post>> GetAllByWardIDAndPrice(int wardID, int maxPrice, int minPrice);
    }
}
