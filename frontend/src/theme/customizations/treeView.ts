import { alpha, Theme } from '@mui/material/styles';
import type { TreeViewComponents } from '@mui/x-tree-view/themeAugmentation';
import { gray, brand } from '../themePrimitives';

/* eslint-disable import/prefer-default-export */
export const treeViewCustomizations: TreeViewComponents<Theme> = {
  MuiTreeItem: {
    styleOverrides: {
      root: ({ theme }: { theme: Theme }) => ({
        position: 'relative',
        boxSizing: 'border-box',
        padding: theme.spacing(0, 1),
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.text.secondary,
        transition: 'all 150ms ease-in-out',
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.hover, 0.1),
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
        '&.Mui-selected': {
          backgroundColor: alpha(theme.palette.action.selected, 0.15),
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: alpha(theme.palette.action.selected, 0.25),
          },
        },
      }),
      content: ({ theme }: { theme: Theme }) => ({
        marginTop: theme.spacing(1),
        padding: theme.spacing(0.5, 1),
        overflow: 'clip',
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.text.secondary,
        transition: 'all 150ms ease-in-out',
        '&:hover': {
          backgroundColor: alpha(theme.palette.action.hover, 0.1),
        },
        '&:focus-visible': {
          outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
          outlineOffset: '2px',
        },
        '&.Mui-selected': {
          backgroundColor: alpha(theme.palette.action.selected, 0.15),
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: alpha(theme.palette.action.selected, 0.25),
          },
        },
      }),
    },
  },
};
