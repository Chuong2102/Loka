using Loka.Infrastructure.Contracts;
using Loka.Infrastrure.Context;
using Loka.Infrastrure.Entities;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public class WardRepository : EFRepositoryBase<Ward>, IWardRepository
    {
        DataLokaContext context;
        public WardRepository(DataLokaContext dataLokaContext) : base(dataLokaContext)
        {
            context = dataLokaContext;
        }

        public Ward GetByName(string name)
        {
            return context.Wards.FirstOrDefault(w => w.WardName.Equals(name.Trim()));
        }
    }
}
