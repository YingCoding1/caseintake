using CaseIntake.Core.Models;

namespace CaseIntake.Core.Interfaces
{
    public interface ICaseService
    {
        Task<Case> CreateCaseAsync(Case caseEntity);
        Task<Case> GetCaseByIdAsync(int id);
        Task<IEnumerable<Case>> GetAllCasesAsync();
        Task<Case> UpdateCaseAsync(Case caseEntity);
        Task<bool> DeleteCaseAsync(int id);
        Task<string> GenerateReferenceNumberAsync();
    }
} 