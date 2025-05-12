import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5218';

export interface Case {
    id: string;
    referenceNumber: string;
    fullName: string;
    email: string;
    description: string;
    status: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    attachments: FileAttachment[];
}

export interface FileAttachment {
    id: string;
    fileName: string;
    contentType: string;
    filePath: string;
}

class CaseService {
    async createCase(formData: FormData): Promise<Case> {
        const response = await axios.post(`${API_URL}/api/cases`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    }

    async getCases(): Promise<Case[]> {
        const response = await axios.get(`${API_URL}/api/cases`);
        return response.data;
    }

    async getCase(id: string): Promise<Case> {
        const response = await axios.get(`${API_URL}/api/cases/${id}`);
        return response.data;
    }

    async updateCase(id: string, data: Partial<Case>): Promise<Case> {
        const response = await axios.put(`${API_URL}/api/cases/${id}`, data);
        return response.data;
    }
}

export const caseService = new CaseService(); 