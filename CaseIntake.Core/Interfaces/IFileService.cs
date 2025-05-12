using Microsoft.AspNetCore.Http;
using CaseIntake.Core.Models;

namespace CaseIntake.Core.Interfaces
{
    public interface IFileService
    {
        Task<FileAttachment> SaveFileAsync(IFormFile file, int caseId);
        Task<FileAttachment> GetFileByIdAsync(int id);
        Task<IEnumerable<FileAttachment>> GetFilesByCaseIdAsync(int caseId);
        Task<bool> DeleteFileAsync(int id);
        Task<string> GetFilePathAsync(int id);
    }
} 