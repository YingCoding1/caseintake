import axios from 'axios';
import { Case, CreateCaseDto, CaseResponseDto, FileAttachment } from '../types';

const API_BASE_URL = 'http://localhost:5218/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const caseService = {
    createCase: async (caseData: CreateCaseDto): Promise<CaseResponseDto> => {
        const formData = new FormData();
        formData.append('FullName', caseData.fullName);
        formData.append('Email', caseData.email);
        formData.append('Type', caseData.type.toString());
        formData.append('Description', caseData.description);
        
        if (caseData.files) {
            caseData.files.forEach((file) => {
                formData.append('Files', file);
            });
        }

        const response = await api.post<CaseResponseDto>('/cases', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    getCases: async (): Promise<Case[]> => {
        const response = await api.get<Case[]>('/cases');
        return response.data;
    },

    getCaseById: async (id: number): Promise<Case> => {
        const response = await api.get<Case>(`/cases/${id}`);
        return response.data;
    },

    updateCaseStatus: async (id: number, status: string): Promise<Case> => {
        const response = await api.patch<Case>(`/cases/${id}`, { status });
        return response.data;
    },

    uploadFile: async (caseId: number, file: File): Promise<FileAttachment> => {
        const formData = new FormData();
        formData.append('file', file);

        const response = await api.post<FileAttachment>(`/cases/${caseId}/files`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteFile: async (caseId: number, fileId: number): Promise<void> => {
        await api.delete(`/cases/${caseId}/files/${fileId}`);
    },
}; 