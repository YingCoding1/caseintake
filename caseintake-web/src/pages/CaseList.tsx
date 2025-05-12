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
    Button,
    Box,
    Alert,
} from '@mui/material';
import { caseService, Case } from '../services/caseService';

export const CaseList: React.FC = () => {
    const navigate = useNavigate();
    const [cases, setCases] = useState<Case[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadCases();
    }, []);

    const loadCases = async () => {
        try {
            const data = await caseService.getCases();
            setCases(data);
        } catch (err) {
            setError('Failed to load cases. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewCase = (id: string) => {
        navigate(`/cases/${id}`);
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Cases
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/cases/new')}
                >
                    New Case
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reference</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Created</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cases.map((caseItem) => (
                            <TableRow key={caseItem.id}>
                                <TableCell>{caseItem.referenceNumber}</TableCell>
                                <TableCell>{caseItem.fullName}</TableCell>
                                <TableCell>{caseItem.email}</TableCell>
                                <TableCell>{caseItem.type}</TableCell>
                                <TableCell>{caseItem.status}</TableCell>
                                <TableCell>
                                    {new Date(caseItem.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                        onClick={() => handleViewCase(caseItem.id)}
                                    >
                                        View
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}; 