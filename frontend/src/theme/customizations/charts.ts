import { axisClasses, legendClasses } from '@mui/x-charts';
import type { ChartsComponents } from '@mui/x-charts/themeAugmentation';
import { gray } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const chartsCustomizations: ChartsComponents = {
  MuiChartsAxis: {
    styleOverrides: {
      root: {
        [`& .${axisClasses.line}`]: {
          stroke: gray[300],
        },
        [`& .${axisClasses.tick}`]: { stroke: gray[300] },
        [`& .${axisClasses.tickLabel}`]: {
          fill: gray[500],
          fontWeight: 500,
        },
      },
    },
  },
  MuiChartsTooltip: {
    styleOverrides: {
      mark: {
        ry: 6,
        boxShadow: 'none',
        border: `1px solid ${gray[200]}`,
      },
      table: {
        border: `1px solid ${gray[200]}`,
        borderRadius: 8,
        background: 'hsl(0, 0%, 100%)',
      },
    },
  },
  MuiChartsLegend: {
    styleOverrides: {
      root: {
        [`& .${legendClasses.mark}`]: {
          ry: 6,
        },
      },
    },
  },
};
