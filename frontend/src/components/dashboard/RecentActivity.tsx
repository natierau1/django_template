import React from 'react';
import {
  Paper,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
} from '@mui/x-data-grid';

interface Activity {
  id: number;
  user: string;
  action: string;
  type: 'login' | 'update' | 'create' | 'delete';
  timestamp: string;
}

const RecentActivity: React.FC = () => {
  // Sample data - in a real app, this would come from an API
  const activities: Activity[] = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Updated profile',
      type: 'update',
      timestamp: '2024-01-26 14:30',
    },
    {
      id: 2,
      user: 'Jane Smith',
      action: 'Created new project',
      type: 'create',
      timestamp: '2024-01-26 13:45',
    },
    {
      id: 3,
      user: 'Mike Johnson',
      action: 'Logged in',
      type: 'login',
      timestamp: '2024-01-26 13:15',
    },
    {
      id: 4,
      user: 'Sarah Wilson',
      action: 'Deleted task',
      type: 'delete',
      timestamp: '2024-01-26 12:30',
    },
  ];

  const getChipColor = (type: Activity['type']) => {
    switch (type) {
      case 'create':
        return 'success';
      case 'update':
        return 'info';
      case 'delete':
        return 'error';
      case 'login':
        return 'default';
      default:
        return 'default';
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'user',
      headerName: 'User',
      flex: 1,
      minWidth: 130,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      minWidth: 110,
      renderCell: (params: GridRenderCellParams<Activity>) => (
        <Chip
          label={params.value}
          color={getChipColor(params.value as Activity['type'])}
          size="small"
        />
      ),
    },
    {
      field: 'timestamp',
      headerName: 'Time',
      flex: 1,
      minWidth: 160,
    },
  ];

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
          Recent Activity
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <DataGrid
          rows={activities}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          autoHeight
        />
      </Box>
    </Paper>
  );
};

export default RecentActivity; 