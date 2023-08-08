using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public interface IWardRepository : IEFRepositoryBase<Ward>
    {
        public Ward GetByName(string name);
    }
}
