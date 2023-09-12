using Loka.Infrastructure.Contracts;
using Loka.Infrastructure.Entities;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public interface ISchoolRepository : IEFRepositoryBase<School>
    {
        Task<School> GetBySchoolID(int schoolID);
    }
}
