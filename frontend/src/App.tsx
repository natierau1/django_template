import React, { useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme/theme';
import DashboardPage from './pages/dashboard/DashboardPage';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AuthService from './services/authService';

function App() {
  useEffect(() => {
    // Setup axios interceptors for token handling
    AuthService.setupAxiosInterceptors();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 