import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

interface DataPoint {
  date: string;
  users: number;
  revenue: number;
  sessions: number;
}

const AnalyticsChart: React.FC = () => {
  // Sample data - in a real app, this would come from an API
  const data: DataPoint[] = [
    { date: '2024-01', users: 1200, revenue: 25000, sessions: 450 },
    { date: '2024-02', users: 1500, revenue: 28000, sessions: 520 },
    { date: '2024-03', users: 1800, revenue: 32000, sessions: 580 },
    { date: '2024-04', users: 2100, revenue: 35000, sessions: 620 },
    { date: '2024-05', users: 2300, revenue: 34252, sessions: 573 },
  ];

  const chartSeries = [
    {
      data: data.map(d => d.users),
      label: 'Users',
      color: '#1976d2',
    },
    {
      data: data.map(d => d.sessions),
      label: 'Sessions',
      color: '#dc004e',
    },
  ];

  const xLabels = data.map(d => d.date);

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 400,
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" color="text.secondary">
          Analytics Overview
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <LineChart
          series={chartSeries}
          xAxis={[{ scaleType: 'point', data: xLabels }]}
          height={300}
          margin={{ top: 20, right: 20, bottom: 30, left: 40 }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
              padding: 0,
            },
          }}
        />
      </Box>
    </Paper>
  );
};

export default AnalyticsChart; 