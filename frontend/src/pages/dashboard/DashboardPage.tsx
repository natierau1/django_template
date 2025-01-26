import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Grid } from '@mui/material';
import Dashboard from '../../components/Dashboard';
import StatsOverview from '../../components/dashboard/StatsOverview';
import AnalyticsChart from '../../components/dashboard/AnalyticsChart';
import RecentActivity from '../../components/dashboard/RecentActivity';

const DashboardOverview: React.FC = () => (
  <>
    <Grid item xs={12}>
      <StatsOverview />
    </Grid>
    <Grid item xs={12} md={8}>
      <AnalyticsChart />
    </Grid>
    <Grid item xs={12} md={4}>
      <RecentActivity />
    </Grid>
  </>
);

const DashboardPage: React.FC = () => {
  return (
    <Dashboard>
      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/users" element={<div>Users Page (Coming Soon)</div>} />
        <Route path="/reports" element={<div>Reports Page (Coming Soon)</div>} />
        <Route path="/integrations" element={<div>Integrations Page (Coming Soon)</div>} />
        <Route path="/reports/current" element={<div>Current Month Report (Coming Soon)</div>} />
        <Route path="/reports/last-quarter" element={<div>Last Quarter Report (Coming Soon)</div>} />
        <Route path="/reports/year-end" element={<div>Year End Report (Coming Soon)</div>} />
      </Routes>
    </Dashboard>
  );
};

export default DashboardPage; 