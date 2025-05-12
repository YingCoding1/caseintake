using System;

namespace CaseIntake.Core.Models
{
    public class FileAttachment
    {
        public int Id { get; set; }
        public required string FileName { get; set; }
        public required string ContentType { get; set; }
        public long FileSize { get; set; }
        public required string FilePath { get; set; }
        public DateTime UploadedAt { get; set; }
        public int CaseId { get; set; }
        public required Case Case { get; set; }
    }
} 