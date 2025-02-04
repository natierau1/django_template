# Spark Interface Implementation Guide

This document provides instructions for implementing a Spark-like document analysis interface within the existing Material-UI dashboard template. Spark is an AI-powered document management and analysis system that enables users to organize, analyze, and interact with document collections.

## System Overview

### Core Features
1. Hierarchical notebook structure with infinite nesting
2. Multi-document management and context selection
3. AI-powered chat interface
4. Dynamic content generation
5. Document analysis tools

### Panel Layout
The interface consists of four main panels:
1. Notebook Navigator (far left): Hierarchical organization
2. Sources Panel (left): Document management
3. Chat Arena (center): AI interactions
4. Studio Panel (right): Analysis tools and content view

## Component Implementation

### 1. NotebookPanel Component

```typescript
interface NotebookItem {
  id: string;
  title: string;
  type: 'notebook' | 'note';
  children?: NotebookItem[];
}

const NotebookPanel: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const [items, setItems] = useState<NotebookItem[]>([]);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const handleAddNote = (parentId: string) => {
    // Implementation for adding new note
  };

  const handleEdit = (itemId: string) => {
    // Trigger edit panel slide-over
  };

  return (
    <Box
      sx={{
        height: '100%',
        overflow: 'auto',
        transition: 'all 0.3s ease'
      }}
    >
      <TreeView
        defaultCollapseIcon={<ExpandMore />}
        defaultExpandIcon={<ChevronRight />}
      >
        {/* Render notebook hierarchy */}
      </TreeView>
    </Box>
  );
};
```

### 2. NoteEditPanel Component

```typescript
interface NoteEditPanelProps {
  note: Note;
  onSave: (note: Note) => void;
  onDelete: (noteId: string) => void;
  onClose: () => void;
}

const NoteEditPanel: React.FC<NoteEditPanelProps> = ({
  note,
  onSave,
  onDelete,
  onClose
}) => {
  return (
    <Slide direction="left" in={true}>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '100%',
          height: '100%',
          bgcolor: 'background.paper',
          boxShadow: 3,
          zIndex: 1000
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            value={note.title}
            onChange={handleTitleChange}
          />
          <TextField
            label="Content"
            multiline
            rows={4}
            fullWidth
            value={note.content}
          />
          {/* Sources, Summary fields */}
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Button onClick={onDelete} color="error">
            Delete
          </Button>
        </form>
      </Box>
    </Slide>
  );
};
```

### 3. Chat Interface Implementation

```typescript
const ChatArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContext, setSelectedContext] = useState<string[]>([]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </Box>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <ChatInput onSend={handleSend} />
      </Box>
    </Box>
  );
};
```

## Integration with Existing Dashboard

### Dashboard Modifications

```typescript
// Automatically collapse the main dashboard sidebar when entering Spark view
const SparkView: React.FC = () => {
  const { setSidebarOpen } = useDashboardContext();
  
  useEffect(() => {
    setSidebarOpen(false);
    return () => setSidebarOpen(true);
  }, []);
  
  return <SparkLayout />;
};
```

## Component Structure

```
src/
├── pages/
│   └── spark/
│       └── index.tsx           # Main Spark view
├── components/
│   └── spark/
│       ├── SparkLayout.tsx     # Main layout wrapper
│       ├── NotebookPanel.tsx   # Notebook navigator panel
│       ├── SourcesPanel.tsx    # Left panel for document sources
│       ├── ChatArea.tsx        # Center panel with AI chat interface
│       ├── StudioPanel.tsx     # Right panel for analysis tools
│       └── NoteEditPanel.tsx   # Slide-over panel for note editing
```

## Implementation Steps

### 1. SparkLayout Component

```typescript
import { Box, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface PanelProps {
  isCollapsed: boolean;
  onToggle: () => void;
  width: { expanded: number; collapsed: number };
  children: React.ReactNode;
}

const CollapsiblePanel: React.FC<PanelProps> = ({
  isCollapsed,
  onToggle,
  width,
  children
}) => (
  <Box
    sx={{
      width: isCollapsed ? width.collapsed : width.expanded,
      transition: 'width 0.3s ease',
      position: 'relative',
      borderRight: 1,
      borderColor: 'divider'
    }}
  >
    {children}
    <IconButton
      onClick={onToggle}
      sx={{
        position: 'absolute',
        top: 2,
        right: -20,
        bgcolor: 'background.paper',
        boxShadow: 1
      }}
    >
      {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
    </IconButton>
  </Box>
);
```

### 2. Content Area Implementation

```typescript
const ContentArea: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        {/* Message history */}
      </Box>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        {/* Input area */}
      </Box>
    </Box>
  );
};
```

### 3. Panel Widths and Responsiveness

Default panel widths (in pixels):
- Notebook Panel: 240 (expanded) / 48 (collapsed)
- Sources Panel: 280 (expanded) / 48 (collapsed)
- Chat Area: flexible
- Studio Panel: 320 (expanded) / 48 (collapsed)

```typescript
const PANEL_WIDTHS = {
  notebook: { expanded: 240, collapsed: 48 },
  sources: { expanded: 280, collapsed: 48 },
  studio: { expanded: 320, collapsed: 48 }
} as const;
```

## State Management

Use React context for managing panel states:

```typescript
interface SparkContextType {
  notebookPanelCollapsed: boolean;
  sourcesPanelCollapsed: boolean;
  studioPanelCollapsed: boolean;
  toggleNotebookPanel: () => void;
  toggleSourcesPanel: () => void;
  toggleStudioPanel: () => void;
}

const SparkContext = createContext<SparkContextType>(null!);
```

## Material-UI Integration

### Theme Customization

```typescript
const sparkTheme = createTheme({
  components: {
    MuiTreeItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            '& .MuiTreeItem-content': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)'
            }
          }
        }
      }
    }
  }
});
```

## Responsive Behavior

```typescript
const useResponsiveLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  return {
    isMobile,
    isTablet,
    showNotebooks: !isMobile,
    showSources: !isMobile && !isTablet,
    defaultCollapsed: isMobile || isTablet
  };
};
```

## Getting Started

1. Create the new Spark route in your dashboard
2. Implement the SparkLayout component
3. Add the collapsible panels
4. Integrate with the existing Material-UI theme
5. Test responsive behavior

## Best Practices

1. Maintain consistent transitions
2. Use Material-UI components
3. Implement proper keyboard navigation
4. Handle loading and error states
5. Maintain state persistence

## Future Enhancements

1. Advanced search capabilities
2. Collaborative features
3. Custom analysis tools
4. Enhanced document processing
5. Integration with external services
