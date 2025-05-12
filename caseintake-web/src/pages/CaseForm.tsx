import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    TextField,
    Button,
    Box,
    Alert,
    MenuItem,
} from '@mui/material';
import { caseService } from '../services/caseService';

export const CaseForm: React.FC = () => {
    const location = useLocation();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        description: '',
        type: '',
    });
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Check if we have a success state from navigation
        const state = location.state as { success?: boolean } | null;
        if (state?.success) {
            setSuccess(true);
            // Clear the success state from location
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();
            formDataToSend.append('fullName', formData.fullName);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('type', formData.type);
            files.forEach(file => {
                formDataToSend.append('files', file);
            });

            await caseService.createCase(formDataToSend);
            setSuccess(true);
            // Reset form
            setFormData({
                fullName: '',
                email: '',
                description: '',
                type: '',
            });
            setFiles([]);
        } catch (err) {
            setError('Failed to submit case. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(Array.from(e.target.files));
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Submit New Case
                </Typography>

                {success && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                        Case submitted successfully!
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        multiline
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        select
                        label="Case Type"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        margin="normal"
                        required
                    >
                        <MenuItem value="INQUIRY">Inquiry</MenuItem>
                        <MenuItem value="COMPLAINT">Complaint</MenuItem>
                        <MenuItem value="SUGGESTION">Suggestion</MenuItem>
                    </TextField>

                    <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 2 }}
                    >
                        Upload Files
                        <input
                            type="file"
                            hidden
                            multiple
                            onChange={handleFileChange}
                        />
                    </Button>

                    {files.length > 0 && (
                        <Typography variant="body2" sx={{ mt: 1 }}>
                            {files.length} file(s) selected
                        </Typography>
                    )}

                    {error && (
                        <Alert severity="error" sx={{ mt: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Submitting...' : 'Submit Case'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
}; 