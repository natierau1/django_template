import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Chip, Typography, Stack } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const AreaGradient = ({ color, id }: { color: string; id: string }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor={color} stopOpacity={0.3} />
      <stop offset="100%" stopColor={color} stopOpacity={0.05} />
    </linearGradient>
  </defs>
);

const generateMockData = (baseValue: number, days: number) =>
  Array.from({ length: days }, (_, i) => 
    Math.floor(baseValue + (i * baseValue * 0.1) + Math.random() * 500)
  );

export default function SessionsChart() {
  const theme = useTheme();
  const days = 30;
  
  // Generate x-axis labels (Apr 1 - Apr 30)
  const xLabels = Array.from({ length: days }, (_, i) => 
    `Apr ${i + 1}`
  );

  const series = [
    {
      id: 'direct',
      label: 'Direct',
      data: generateMockData(2000, days),
      area: true,
      stack: 'total',
      showMark: false,
      color: theme.palette.primary.light,
    },
    {
      id: 'referral',
      label: 'Referral',
      data: generateMockData(3000, days),
      area: true,
      stack: 'total',
      showMark: false,
      color: theme.palette.primary.main,
    },
    {
      id: 'organic',
      label: 'Organic',
      data: generateMockData(4000, days),
      area: true,
      stack: 'total',
      showMark: false,
      color: theme.palette.primary.dark,
    },
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="subtitle2">Sessions</Typography>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="h4">13,277</Typography>
            <Chip size="small" color="success" label="+35%" />
          </Stack>
          
          <Typography variant="caption" color="text.secondary">
            Sessions per day for the last 30 days
          </Typography>

          <LineChart
            height={250}
            series={series}
            xAxis={[{
              data: xLabels,
              scaleType: 'point',
              tickInterval: (_, i) => i % 5 === 0,
            }]}
            sx={{
              '.MuiLineElement-root': {
                strokeWidth: 2,
              },
              '.MuiAreaElement-series-direct': {
                fill: `url('#gradient-direct')`,
              },
              '.MuiAreaElement-series-referral': {
                fill: `url('#gradient-referral')`,
              },
              '.MuiAreaElement-series-organic': {
                fill: `url('#gradient-organic')`,
              },
            }}
            margin={{ left: 50, right: 20, top: 20, bottom: 20 }}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <AreaGradient color={series[0].color} id="gradient-direct" />
            <AreaGradient color={series[1].color} id="gradient-referral" />
            <AreaGradient color={series[2].color} id="gradient-organic" />
          </LineChart>
        </Stack>
      </CardContent>
    </Card>
  );
}
