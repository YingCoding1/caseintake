using Microsoft.AspNetCore.Mvc;
using CaseIntake.Core.Interfaces;
using CaseIntake.Core.Models;

namespace CaseIntake.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FilesController : ControllerBase
    {
        private readonly IFileService _fileService;

        public FilesController(IFileService fileService)
        {
            _fileService = fileService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFile(int id)
        {
            var fileAttachment = await _fileService.GetFileByIdAsync(id);
            if (fileAttachment == null)
            {
                return NotFound();
            }

            var filePath = await _fileService.GetFilePathAsync(id);
            if (string.IsNullOrEmpty(filePath) || !System.IO.File.Exists(filePath))
            {
                return NotFound();
            }

            var fileBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            return File(fileBytes, fileAttachment.ContentType, fileAttachment.FileName);
        }

        [HttpGet("case/{caseId}")]
        public async Task<ActionResult<IEnumerable<FileAttachment>>> GetFilesByCaseId(int caseId)
        {
            var files = await _fileService.GetFilesByCaseIdAsync(caseId);
            return Ok(files);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFile(int id)
        {
            var result = await _fileService.DeleteFileAsync(id);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
} 