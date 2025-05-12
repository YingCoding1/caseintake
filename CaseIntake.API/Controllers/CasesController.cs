using Microsoft.AspNetCore.Mvc;
using CaseIntake.Core.Interfaces;
using CaseIntake.Core.Models;
using CaseIntake.Core.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CaseIntake.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CasesController : ControllerBase
    {
        private readonly ICaseService _caseService;

        public CasesController(ICaseService caseService)
        {
            _caseService = caseService;
        }

        [HttpPost]
        public async Task<ActionResult<Case>> CreateCase([FromForm] CreateCaseDto createCaseDto)
        {
            var caseItem = new Case
            {
                FullName = createCaseDto.FullName,
                Email = createCaseDto.Email,
                Type = createCaseDto.Type.ToString(),
                Description = createCaseDto.Description,
                ReferenceNumber = await _caseService.GenerateReferenceNumberAsync(),
                Status = CaseStatus.New.ToString(),
                Attachments = new List<FileAttachment>()
            };

            var createdCase = await _caseService.CreateCaseAsync(caseItem);
            return CreatedAtAction(nameof(GetCase), new { id = createdCase.Id }, createdCase);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Case>> GetCase(int id)
        {
            var caseItem = await _caseService.GetCaseByIdAsync(id);
            if (caseItem == null)
            {
                return NotFound();
            }
            return Ok(caseItem);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Case>>> GetAllCases()
        {
            var cases = await _caseService.GetAllCasesAsync();
            return Ok(cases);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCase(int id, Case caseItem)
        {
            if (id != caseItem.Id)
            {
                return BadRequest();
            }
            await _caseService.UpdateCaseAsync(caseItem);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCase(int id)
        {
            var result = await _caseService.DeleteCaseAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
} 