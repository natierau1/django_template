import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    theme.palette.primary.dark,
    theme.palette.primary.main,
    theme.palette.primary.light,
  ];

  const dataset = [
    { month: 'Jan', pageViews: 2234, downloads: 3098, conversions: 4051 },
    { month: 'Feb', pageViews: 3872, downloads: 4215, conversions: 2275 },
    { month: 'Mar', pageViews: 2998, downloads: 2384, conversions: 3129 },
    { month: 'Apr', pageViews: 4125, downloads: 2101, conversions: 4693 },
    { month: 'May', pageViews: 3357, downloads: 4752, conversions: 3904 },
    { month: 'Jun', pageViews: 2789, downloads: 3593, conversions: 2038 },
    { month: 'Jul', pageViews: 2998, downloads: 2384, conversions: 2275 },
  ];

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Page views and downloads
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant="h4" component="p">
              1.3M
            </Typography>
            <Chip size="small" color="error" label="-8%" />
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Page views and downloads for the last 6 months
          </Typography>
        </Stack>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: 'band', dataKey: 'month' }]} // x-axis configured for months
          series={[
            { dataKey: 'pageViews', label: 'Page views', stack: 'A' },
            { dataKey: 'downloads', label: 'Downloads', stack: 'A' },
            { dataKey: 'conversions', label: 'Conversions', stack: 'A' },
          ]}
          width={600}
          height={350}
          slotProps={{
            legend: { hidden: false }, // Show legend
          }}
        />
      </CardContent>
    </Card>
  );
}
