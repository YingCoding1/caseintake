import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    Button,
    Box,
    CircularProgress,
    Alert,
} from '@mui/material';
import { Case, CaseStatus } from '../types';
import { caseService } from '../services/api';

export const CasesListPage: React.FC = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState<Case[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCases = async () => {
            try {
                const data = await caseService.getCases();
                setCases(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load cases');
            } finally {
                setLoading(false);
            }
        };

        fetchCases();
    }, []);

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

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">
                    All Cases
                </Typography>
                <Button variant="contained" onClick={() => navigate('/cases/new')}>
                    Create New Case
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reference</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cases.map((caseItem) => (
                            <TableRow key={caseItem.id}>
                                <TableCell>{caseItem.referenceNumber}</TableCell>
                                <TableCell>{caseItem.fullName}</TableCell>
                                <TableCell>
                                    <Chip label={caseItem.type} color="primary" size="small" />
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={caseItem.status}
                                        color={
                                            caseItem.status === CaseStatus.New ? 'info' :
                                            caseItem.status === CaseStatus.InProgress ? 'warning' :
                                            caseItem.status === CaseStatus.Resolved ? 'success' :
                                            'default'
                                        }
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell>
                                    {new Date(caseItem.createdAt).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => navigate(`/cases/${caseItem.id}`)}
                                    >
                                        View Details
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {cases.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="body1" color="text.secondary">
                                        No cases found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}; 