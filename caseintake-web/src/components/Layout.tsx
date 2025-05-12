import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    Container,
} from '@mui/material';
import { authService } from '../services/auth';

export const Layout: React.FC = () => {
    const navigate = useNavigate();
    const isAuthenticated = authService.isAuthenticated();
    const isAdmin = authService.isAdmin();

    const handleLogout = () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Case Intake System
                    </Typography>
                    {isAuthenticated && (
                        <>
                            <Button color="inherit" onClick={() => navigate('/cases/new')}>
                                New Case
                            </Button>
                            {isAdmin && (
                                <Button color="inherit" onClick={() => navigate('/cases')}>
                                    View Cases
                                </Button>
                            )}
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
            <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
                <Outlet />
            </Container>
        </Box>
    );
}; 