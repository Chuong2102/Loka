using Loka.Infrastructure.Contracts;
using Loka.Infrastructure.Entities;
using Loka.Infrastrure.Context;
using Microsoft.EntityFrameworkCore;

namespace Loka.Infrastructure.Repositories.EFCore
{
    public class SchoolRepository : EFRepositoryBase<School>, ISchoolRepository
    {
        DataLokaContext _context;
        public SchoolRepository(DataLokaContext dataLoka) : base(dataLoka)
        {
            _context = dataLoka;
        }

        public async Task<School> GetBySchoolID(int schoolID)
        {
            var school = await _context.Schools.FirstOrDefaultAsync(s => s.SchoolID == schoolID);

            return school;
        }
    }
}
