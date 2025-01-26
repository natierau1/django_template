import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  AttachMoney as AttachMoneyIcon,
  ShowChart as ShowChartIcon,
} from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
      <Typography color="text.secondary" variant="h6" component="div">
        {title}
      </Typography>
      <Box sx={{ color: 'primary.main' }}>{icon}</Box>
    </Box>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
    {trend && (
      <Typography
        component="p"
        variant="body2"
        sx={{
          color: trend.isPositive ? 'success.main' : 'error.main',
          display: 'flex',
          alignItems: 'center',
          mt: 1,
        }}
      >
        <TrendingUpIcon
          sx={{
            mr: 1,
            transform: trend.isPositive ? 'none' : 'rotate(180deg)',
          }}
        />
        {trend.value}% {trend.isPositive ? 'increase' : 'decrease'}
      </Typography>
    )}
  </Paper>
);

const StatsOverview: React.FC = () => {
  // In a real app, these would come from an API
  const stats = [
    {
      title: 'Total Users',
      value: '2,300',
      icon: <PeopleIcon />,
      trend: { value: 12, isPositive: true },
    },
    {
      title: 'Revenue',
      value: '$34,252',
      icon: <AttachMoneyIcon />,
      trend: { value: 4, isPositive: true },
    },
    {
      title: 'Active Sessions',
      value: '573',
      icon: <ShowChartIcon />,
      trend: { value: 2.5, isPositive: false },
    },
    {
      title: 'Conversion Rate',
      value: '2.39%',
      icon: <TrendingUpIcon />,
      trend: { value: 8, isPositive: true },
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsOverview; 