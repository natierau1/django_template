import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PanelProps {
  isCollapsed: boolean;
  panelPosition: 'left' | 'right';
  width: { expanded: number; collapsed: number };
}

const PanelContainer = styled(Box, {
  shouldForwardProp: (prop) => 
    prop !== 'isCollapsed' && prop !== 'panelPosition' && prop !== 'width',
})<PanelProps>(({ theme, isCollapsed, panelPosition, width }) => ({
  position: 'relative',
  width: isCollapsed ? width.collapsed : width.expanded,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: theme.palette.background.paper,
  borderRight: panelPosition === 'left' ? `1px solid ${theme.palette.divider}` : 'none',
  borderLeft: panelPosition === 'right' ? `1px solid ${theme.palette.divider}` : 'none',
  height: '100%',
  overflow: 'hidden',
}));

const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  zIndex: 1,
  boxShadow: theme.shadows[2],
}));

interface CollapsiblePanelProps {
  children: React.ReactNode;
  isCollapsed: boolean;
  onToggle: () => void;
  position: 'left' | 'right';
  width: {
    expanded: number;
    collapsed: number;
  };
}

export default function CollapsiblePanel({
  children,
  isCollapsed,
  onToggle,
  position,
  width,
}: CollapsiblePanelProps) {
  return (
    <PanelContainer isCollapsed={isCollapsed} panelPosition={position} width={width}>
      <ToggleButton
        onClick={onToggle}
        sx={{ [position === 'left' ? 'right' : 'left']: -20 }}
        size="small"
        aria-label={isCollapsed ? 'Expand panel' : 'Collapse panel'}
      >
        {position === 'left' ? (
          isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />
        ) : (
          isCollapsed ? <ChevronLeftIcon /> : <ChevronRightIcon />
        )}
      </ToggleButton>
      {children}
    </PanelContainer>
  );
}
