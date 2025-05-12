using Microsoft.EntityFrameworkCore;
using CaseIntake.Core.Interfaces;
using CaseIntake.Core.Models;
using CaseIntake.Infrastructure.Data;

namespace CaseIntake.Infrastructure.Services
{
    public class CaseService : ICaseService
    {
        private readonly ApplicationDbContext _context;

        public CaseService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Case> CreateCaseAsync(Case caseItem)
        {
            caseItem.CreatedAt = DateTime.UtcNow;
            caseItem.Status = CaseStatus.New.ToString();
            _context.Cases.Add(caseItem);
            await _context.SaveChangesAsync();
            return caseItem;
        }

        public async Task<Case> GetCaseByIdAsync(int id)
        {
            return await _context.Cases.Include(c => c.Attachments).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<Case>> GetAllCasesAsync()
        {
            return await _context.Cases.Include(c => c.Attachments).ToListAsync();
        }

        public async Task<Case> UpdateCaseAsync(Case caseItem)
        {
            _context.Entry(caseItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return caseItem;
        }

        public async Task<bool> DeleteCaseAsync(int id)
        {
            var caseItem = await _context.Cases.FindAsync(id);
            if (caseItem == null)
            {
                return false;
            }
            _context.Cases.Remove(caseItem);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> GenerateReferenceNumberAsync()
        {
            var timestamp = DateTime.UtcNow.ToString("yyyyMMddHHmmss");
            var random = new Random();
            var randomNumber = random.Next(1000, 9999);
            return $"CASE-{timestamp}-{randomNumber}";
        }
    }
} 