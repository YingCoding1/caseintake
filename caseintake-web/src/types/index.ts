export interface Case {
    id: number;
    referenceNumber: string;
    fullName: string;
    email: string;
    type: CaseType;
    description: string;
    status: CaseStatus;
    createdAt: string;
    attachments: FileAttachment[];
}

export interface FileAttachment {
    id: number;
    fileName: string;
    contentType: string;
    fileSize: number;
    filePath: string;
    uploadedAt: string;
    caseId: number;
}

export enum CaseType {
    Complaint = 'Complaint',
    Request = 'Request',
    Inquiry = 'Inquiry'
}

export enum CaseStatus {
    New = 'New',
    InProgress = 'InProgress',
    Resolved = 'Resolved',
    Closed = 'Closed'
}

export interface CreateCaseDto {
    fullName: string;
    email: string;
    type: CaseType;
    description: string;
    files?: File[];
}

export interface CaseResponseDto {
    id: number;
    referenceNumber: string;
    fullName: string;
    email: string;
    type: CaseType;
    description: string;
    status: CaseStatus;
    createdAt: string;
    attachments: FileAttachment[];
} 