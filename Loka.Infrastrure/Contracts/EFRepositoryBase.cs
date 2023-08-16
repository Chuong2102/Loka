﻿using Loka.Infrastrure.Context;
using Microsoft.EntityFrameworkCore;

namespace Loka.Infrastructure.Contracts
{
    public class EFRepositoryBase<T> : IEFRepositoryBase<T> where T : class
    {
        readonly DataLokaContext dataContext;
        public EFRepositoryBase(DataLokaContext dataLoka)
        {
            this.dataContext = dataLoka;
        }

        public async void CreateAsync(T entity)
        {
            await dataContext.AddRangeAsync(entity);
            dataContext.SaveChanges();
        }

        public void DeleteAsync(T entity)
        {
            dataContext.Remove<T>(entity);

            dataContext.SaveChanges();
        }

        public async Task<List<T>> GetAllAsync()
        {
            return await dataContext.Set<T>().ToListAsync();
        }

        public void UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }

    }
}
