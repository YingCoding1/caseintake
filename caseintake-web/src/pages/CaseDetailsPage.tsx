import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Grid,
    Chip,
    Box,
    Button,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Case, CaseStatus } from '../types';
import { caseService } from '../services/api';

export const CaseDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [caseData, setCaseData] = useState<Case | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCase = async () => {
            try {
                if (!id) return;
                const data = await caseService.getCaseById(parseInt(id));
                setCaseData(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load case details');
            } finally {
                setLoading(false);
            }
        };

        fetchCase();
    }, [id]);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="error">{error}</Alert>
            </Container>
        );
    }

    if (!caseData) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="warning">Case not found</Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">
                    Case Details
                </Typography>
                <Button variant="outlined" onClick={() => navigate('/cases')}>
                    Back to All Cases
                </Button>
            </Box>

            <Paper elevation={3} sx={{ p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Reference Number: {caseData.referenceNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Full Name
                        </Typography>
                        <Typography variant="body1">{caseData.fullName}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Email
                        </Typography>
                        <Typography variant="body1">{caseData.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Type
                        </Typography>
                        <Chip label={caseData.type} color="primary" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Status
                        </Typography>
                        <Chip 
                            label={caseData.status} 
                            color={
                                caseData.status === CaseStatus.New ? 'info' :
                                caseData.status === CaseStatus.InProgress ? 'warning' :
                                caseData.status === CaseStatus.Resolved ? 'success' :
                                'default'
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Description
                        </Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                            {caseData.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography variant="body1">
                            {new Date(caseData.createdAt).toLocaleString()}
                        </Typography>
                    </Grid>
                    {caseData.attachments && caseData.attachments.length > 0 && (
                        <Grid item xs={12}>
                            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                Attachments
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {caseData.attachments.map((attachment) => (
                                    <Chip
                                        key={attachment.id}
                                        label={attachment.fileName}
                                        onClick={() => window.open(`/api/files/${attachment.id}`, '_blank')}
                                        sx={{ cursor: 'pointer' }}
                                    />
                                ))}
                            </Box>
                        </Grid>
                    )}
                </Grid>
            </Paper>
        </Container>
    );
}; 