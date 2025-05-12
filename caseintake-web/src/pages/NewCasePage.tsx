import React, { useState } from 'react';
import { Container, Typography, Alert, Snackbar, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CaseForm } from '../components/CaseForm';
import { caseService } from '../services/api';
import { CreateCaseDto } from '../types';

export const NewCasePage: React.FC = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (data: CreateCaseDto) => {
        try {
            setIsSubmitting(true);
            setError(null);
            const response = await caseService.createCase(data);
            setSuccess(true);
            // Redirect to case details page after successful submission
            setTimeout(() => {
                navigate(`/cases/${response.id}`);
            }, 2000);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred while submitting the case');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">
                    Submit a New Case
                </Typography>
                <Button variant="outlined" onClick={() => navigate('/cases')}>
                    Back to All Cases
                </Button>
            </Box>
            <CaseForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
            
            <Snackbar
                open={!!error}
                autoHideDuration={6000}
                onClose={() => setError(null)}
            >
                <Alert severity="error" onClose={() => setError(null)}>
                    {error}
                </Alert>
            </Snackbar>

            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" onClose={() => setSuccess(false)}>
                    Case submitted successfully! Redirecting...
                </Alert>
            </Snackbar>
        </Container>
    );
}; 