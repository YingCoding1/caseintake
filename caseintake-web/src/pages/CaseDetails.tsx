import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Box,
    Grid,
    Button,
    Alert,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import { caseService, Case } from '../services/caseService';

export const CaseDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [caseData, setCaseData] = useState<Case | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadCase(id);
        }
    }, [id]);

    const loadCase = async (caseId: string) => {
        try {
            const data = await caseService.getCase(caseId);
            setCaseData(data);
        } catch (err) {
            setError('Failed to load case details. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!caseData) {
        return (
            <Container maxWidth="md">
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}
            </Container>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ mb: 3 }}>
                <Button
                    variant="outlined"
                    onClick={() => navigate('/cases')}
                    sx={{ mr: 2 }}
                >
                    Back to Cases
                </Button>
            </Box>

            <Paper elevation={3} sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Case Details
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Reference Number
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {caseData.referenceNumber}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Status
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {caseData.status}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Full Name
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {caseData.fullName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Email
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {caseData.email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Description
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {caseData.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Type
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {caseData.type}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Created At
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {new Date(caseData.createdAt).toLocaleString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="text.secondary">
                            Updated At
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            {new Date(caseData.updatedAt).toLocaleString()}
                        </Typography>
                    </Grid>
                </Grid>

                {caseData.attachments.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Attachments
                        </Typography>
                        <List>
                            {caseData.attachments.map((attachment) => (
                                <React.Fragment key={attachment.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={attachment.fileName}
                                            secondary={attachment.contentType}
                                        />
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}; 