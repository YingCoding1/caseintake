using System;

namespace CaseIntake.Core.Models
{
    public class Case
    {
        public int Id { get; set; }
        public required string ReferenceNumber { get; set; }
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string Description { get; set; }
        public DateTime CreatedAt { get; set; }
        public required string Status { get; set; }
        public required string Type { get; set; }
        public required ICollection<FileAttachment> Attachments { get; set; }
    }

    public enum CaseType
    {
        Complaint,
        Request,
        Inquiry
    }

    public enum CaseStatus
    {
        New,
        InProgress,
        Resolved,
        Closed
    }
} 