import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CollapsiblePanel from '../../components/common/CollapsiblePanel';

export default function SparkPage() {
  const [notebookPanelCollapsed, setNotebookPanelCollapsed] = React.useState(false);
  const [sourcesPanelCollapsed, setSourcesPanelCollapsed] = React.useState(false);
  const [studioPanelCollapsed, setStudioPanelCollapsed] = React.useState(false);

  return (
    <Box
      component="main"
      sx={{
        display: 'flex',
        height: '100%',
        backgroundColor: (theme) => alpha(theme.palette.background.default, 1),
      }}
    >
      {/* Notebook Panel */}
      <CollapsiblePanel
        isCollapsed={notebookPanelCollapsed}
        onToggle={() => setNotebookPanelCollapsed(!notebookPanelCollapsed)}
        position="left"
        width={{ expanded: 240, collapsed: 48 }}
      >
        {/* NotebookPanel component will go here */}
        <Box sx={{ p: 2 }}>Notebooks</Box>
      </CollapsiblePanel>

      {/* Sources Panel */}
      <CollapsiblePanel
        isCollapsed={sourcesPanelCollapsed}
        onToggle={() => setSourcesPanelCollapsed(!sourcesPanelCollapsed)}
        position="left"
        width={{ expanded: 280, collapsed: 48 }}
      >
        {/* SourcePanel component will go here */}
        <Box sx={{ p: 2 }}>Sources</Box>
      </CollapsiblePanel>

      {/* Main Chat Area */}
      <Box
        sx={{
          flexGrow: 1,
          height: '100%',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ChatArea component will go here */}
        <Box sx={{ p: 2 }}>Chat Area</Box>
      </Box>

      {/* Studio Panel */}
      <CollapsiblePanel
        isCollapsed={studioPanelCollapsed}
        onToggle={() => setStudioPanelCollapsed(!studioPanelCollapsed)}
        position="right"
        width={{ expanded: 320, collapsed: 48 }}
      >
        {/* StudioPanel component will go here */}
        <Box sx={{ p: 2 }}>Studio</Box>
      </CollapsiblePanel>
    </Box>
  );
}
