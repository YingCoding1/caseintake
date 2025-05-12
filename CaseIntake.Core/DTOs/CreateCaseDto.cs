using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using CaseIntake.Core.Models;

namespace CaseIntake.Core.DTOs
{
    public class CreateCaseDto
    {
        [Required]
        [StringLength(100)]
        public required string FullName { get; set; }

        [Required]
        [EmailAddress]
        [StringLength(100)]
        public required string Email { get; set; }

        [Required]
        public CaseType Type { get; set; }

        [Required]
        [StringLength(2000)]
        public required string Description { get; set; }

        public IFormFile[] Files { get; set; } = Array.Empty<IFormFile>();
    }
} 