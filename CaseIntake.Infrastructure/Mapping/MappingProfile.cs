using AutoMapper;
using CaseIntake.Core.Models;
using CaseIntake.Core.DTOs;

namespace CaseIntake.Infrastructure.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Case, CaseResponseDto>();
            CreateMap<FileAttachment, FileAttachmentDto>();
        }
    }
} 