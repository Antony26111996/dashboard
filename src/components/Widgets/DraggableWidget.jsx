import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton } from '@mui/material';
import { DragIndicator } from '@mui/icons-material';

const DraggableWidget = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: '100%',
  };

  return (
    <Box ref={setNodeRef} style={style} sx={{ position: 'relative', height: '100%' }}>
      <IconButton
        {...attributes}
        {...listeners}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          zIndex: 10,
          color: 'rgba(255,255,255,0.3)',
          cursor: 'grab',
          padding: '4px',
          '&:hover': {
            color: '#00d4ff',
            background: 'rgba(0, 212, 255, 0.1)',
          },
          '&:active': {
            cursor: 'grabbing',
          },
        }}
      >
        <DragIndicator sx={{ fontSize: 18 }} />
      </IconButton>
      {children}
    </Box>
  );
};

export default DraggableWidget;
