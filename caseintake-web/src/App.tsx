import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Layout } from './components/Layout';
import { LoginPage } from './pages/LoginPage';
import { CaseForm } from './pages/CaseForm';
import { CaseList } from './pages/CaseList';
import { CaseDetails } from './pages/CaseDetails';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Navigate to="/cases/new" replace />} />
                        <Route
                            path="cases/new"
                            element={
                                <ProtectedRoute>
                                    <CaseForm />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="cases"
                            element={
                                <ProtectedRoute requireAdmin>
                                    <CaseList />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="cases/:id"
                            element={
                                <ProtectedRoute requireAdmin>
                                    <CaseDetails />
                                </ProtectedRoute>
                            }
                        />
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
