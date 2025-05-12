import React, { useState } from 'react';

import {
    Box,
    Button,
    TextField,
    MenuItem,
    Typography,
    Paper,
    Grid,
} from '@mui/material';
import { CaseType, CreateCaseDto } from '../types';

interface CaseFormProps {
    onSubmit: (data: CreateCaseDto) => Promise<void>;
    isSubmitting?: boolean;
}

export const CaseForm: React.FC<CaseFormProps> = ({ onSubmit, isSubmitting = false }) => {
    const [formData, setFormData] = useState<CreateCaseDto>({
        fullName: '',
        email: '',
        type: CaseType.Request,
        description: '',
        files: [],
    });

    const [errors, setErrors] = useState<Partial<Record<keyof CreateCaseDto, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when field is modified
        if (errors[name as keyof CreateCaseDto]) {
            setErrors((prev) => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData((prev) => ({
                ...prev,
                files: Array.from(e.target.files || []),
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof CreateCaseDto, string>> = {};

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            await onSubmit(formData);
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
                Submit New Case
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Full Name"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Case Type"
                            name="type"
                            select
                            value={formData.type}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {Object.values(CaseType).map((type) => (
                                <MenuItem key={type} value={type}>
                                    {type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Description"
                            name="description"
                            multiline
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            component="label"
                            fullWidth
                        >
                            Upload Files
                            <input
                                type="file"
                                hidden
                                multiple
                                onChange={handleFileChange}
                            />
                        </Button>
                        {formData.files && formData.files.length > 0 && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                                {formData.files.length} file(s) selected
                            </Typography>
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Case'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Paper>
    );
}; 