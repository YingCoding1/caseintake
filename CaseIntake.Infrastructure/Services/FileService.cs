using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using CaseIntake.Core.Interfaces;
using CaseIntake.Core.Models;
using CaseIntake.Infrastructure.Data;

namespace CaseIntake.Infrastructure.Services
{
    public class FileService : IFileService
    {
        private readonly ApplicationDbContext _context;
        private readonly string _uploadsFolderPath;

        public FileService(ApplicationDbContext context, string uploadsFolderPath)
        {
            _context = context;
            _uploadsFolderPath = uploadsFolderPath;
        }

        public async Task<FileAttachment> SaveFileAsync(IFormFile file, int caseId)
        {
            var uploadsFolder = _uploadsFolderPath;
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var caseEntity = await _context.Cases.FindAsync(caseId);
            if (caseEntity == null)
                throw new Exception($"Case with ID {caseId} not found.");

            var fileAttachment = new FileAttachment
            {
                FileName = file.FileName,
                ContentType = file.ContentType,
                FileSize = file.Length,
                FilePath = uniqueFileName,
                UploadedAt = DateTime.UtcNow,
                CaseId = caseId,
                Case = caseEntity
            };

            _context.FileAttachments.Add(fileAttachment);
            await _context.SaveChangesAsync();

            return fileAttachment;
        }

        public async Task<FileAttachment> GetFileByIdAsync(int id)
        {
            return await _context.FileAttachments.FindAsync(id);
        }

        public async Task<IEnumerable<FileAttachment>> GetFilesByCaseIdAsync(int caseId)
        {
            return await _context.FileAttachments
                .Where(f => f.CaseId == caseId)
                .OrderByDescending(f => f.UploadedAt)
                .ToListAsync();
        }

        public async Task<bool> DeleteFileAsync(int id)
        {
            var fileAttachment = await _context.FileAttachments.FindAsync(id);
            if (fileAttachment == null)
                return false;

            var filePath = Path.Combine(_uploadsFolderPath, fileAttachment.FilePath);
            if (File.Exists(filePath))
            {
                File.Delete(filePath);
            }

            _context.FileAttachments.Remove(fileAttachment);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<string> GetFilePathAsync(int id)
        {
            var fileAttachment = await _context.FileAttachments.FindAsync(id);
            if (fileAttachment == null)
                return null;

            return Path.Combine(_uploadsFolderPath, fileAttachment.FilePath);
        }
    }
} 