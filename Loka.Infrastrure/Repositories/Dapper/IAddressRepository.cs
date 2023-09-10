﻿using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.Dapper
{
    public interface IAddressRepository : IRepositoryBase<Address>
    {
        Address GetByRoomID(int roomID);
    }
}
