import { Theme } from '@mui/material/styles';
import type { Components } from '@mui/material/styles';

export const dataGridCustomizations: Components<Theme>['MuiDataGrid'] = {
  styleOverrides: {
    root: {
      border: 'none',
    },
  },
}; 