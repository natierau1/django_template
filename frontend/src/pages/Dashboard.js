import React from 'react';
import { useAuth } from '../auth/AuthContext';
import {
  Container,
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" gutterBottom>
            Welcome, {user?.username}!
          </Typography>
          <Typography variant="body1" paragraph>
            This is your dashboard. You are successfully logged in.
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">User Information:</Typography>
            <Typography>Email: {user?.email}</Typography>
            <Typography>
              Role: {user?.is_staff ? 'Administrator' : 'User'}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={logout}
            sx={{ mt: 3 }}
          >
            Logout
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard; 