using CaseIntake.Core.Models;

namespace CaseIntake.Core.DTOs
{
    public class CaseResponseDto
    {
        public int Id { get; set; }
        public required string ReferenceNumber { get; set; }
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public CaseType Type { get; set; }
        public required string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public required string Status { get; set; }
        public required ICollection<FileAttachmentDto> Attachments { get; set; }
    }

    public class FileAttachmentDto
    {
        public int Id { get; set; }
        public required string FileName { get; set; }
        public required string ContentType { get; set; }
        public long FileSize { get; set; }
        public DateTime UploadedAt { get; set; }
    }
} 