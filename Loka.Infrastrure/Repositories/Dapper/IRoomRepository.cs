﻿using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public interface IRoomRepository : IRepositoryBase<Room>
    {
        Task<Room> GetByPostID(int postID);
    }
}
