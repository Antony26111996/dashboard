import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { Add, Close, Widgets, DragIndicator, Refresh, FileDownload, TableChart, Code } from '@mui/icons-material';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import StatsCard from '../Widgets/StatsCard';
import RevenueChart from '../Widgets/RevenueChart';
import OrdersTable from '../Widgets/OrdersTable';
import ActivityFeed from '../Widgets/ActivityFeed';
import TopProducts from '../Widgets/TopProducts';
import CustomerInsights from '../Widgets/CustomerInsights';
import { DashboardSkeleton } from '../Skeletons/SkeletonWidgets';
import { useData } from '../../context/DataContext';
import { useNotification } from '../../context/NotificationContext';
import { exportAllDataToCSV, exportAllDataToJSON } from '../../utils/exportUtils';

// Available widgets that users can add
const availableWidgets = [
  { id: 'revenue-chart', type: 'revenue-chart', name: 'Revenue Chart', description: 'Monthly revenue overview with area/bar charts', size: 'large' },
  { id: 'orders-table', type: 'orders-table', name: 'Orders Table', description: 'Recent orders with search and pagination', size: 'large' },
  { id: 'top-products', type: 'top-products', name: 'Top Products', description: 'Best selling products by revenue', size: 'small' },
  { id: 'activity-feed', type: 'activity-feed', name: 'Activity Feed', description: 'Live activity updates', size: 'small' },
  { id: 'customer-insights', type: 'customer-insights', name: 'Customer Insights', description: 'Customer segments and metrics', size: 'medium' },
];

// Sortable Widget Component
const SortableWidget = ({ id, widget, onRemove, children }) => {
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
    opacity: isDragging ? 0.4 : 1,
    height: '100%',
  };

  return (
    <Box ref={setNodeRef} style={style} sx={{ position: 'relative', height: '100%' }}>
      {/* Widget Control Buttons - positioned at top-right corner */}
      <Box
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          zIndex: 30,
          display: 'flex',
          gap: 0.25,
          opacity: 0,
          transition: 'opacity 0.2s ease',
        }}
        className="widget-controls"
      >
        {/* Drag Handle */}
        <IconButton
          {...attributes}
          {...listeners}
          size="small"
          sx={{
            color: 'rgba(255,255,255,0.6)',
            cursor: 'grab',
            padding: '3px',
            bgcolor: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            borderRadius: '4px',
            '&:hover': {
              color: '#00d4ff',
              background: 'rgba(0, 212, 255, 0.3)',
            },
            '&:active': {
              cursor: 'grabbing',
            },
          }}
        >
          <DragIndicator sx={{ fontSize: 14 }} />
        </IconButton>
        {/* Remove Button */}
        {widget.type !== 'stat' && (
          <IconButton
            size="small"
            onClick={() => onRemove(widget.id)}
            sx={{
              color: 'rgba(255,255,255,0.6)',
              padding: '3px',
              bgcolor: 'rgba(0,0,0,0.5)',
              backdropFilter: 'blur(8px)',
              borderRadius: '4px',
              '&:hover': {
                color: '#ff5252',
                background: 'rgba(255, 82, 82, 0.3)',
              },
            }}
          >
            <Close sx={{ fontSize: 12 }} />
          </IconButton>
        )}
      </Box>
      {/* Show controls on hover */}
      <style>{`
        .MuiBox-root:hover > .widget-controls {
          opacity: 1 !important;
        }
      `}</style>
      {children}
    </Box>
  );
};

const getWidgetComponent = (widget) => {
  switch (widget.type) {
    case 'stat':
      return <StatsCard {...widget.data} />;
    case 'revenue-chart':
      return <RevenueChart />;
    case 'top-products':
      return <TopProducts />;
    case 'orders-table':
      return <OrdersTable />;
    case 'activity-feed':
      return <ActivityFeed />;
    case 'customer-insights':
      return <CustomerInsights />;
    default:
      return null;
  }
};

// Simulated notifications for demo
const demoNotifications = [
  { message: 'New order received - #ORD-2847', type: 'order' },
  { message: 'Payment confirmed - $1,249.00', type: 'payment' },
  { message: 'New customer signed up - Sarah Johnson', type: 'customer' },
  { message: 'Order shipped - #ORD-2845', type: 'order' },
  { message: 'Refund processed - $89.99', type: 'payment' },
  { message: 'Product back in stock - Wireless Headphones', type: 'info' },
  { message: 'Flash sale started - 25% off electronics', type: 'success' },
  { message: 'Low inventory alert - Smart Watch', type: 'warning' },
];

const Dashboard = () => {
  const { statsData, ordersData, topProductsData, revenueData, loading, error, refreshData } = useData();
  const { notify } = useNotification();

  // All widgets in a single flat array for free movement
  const [widgets, setWidgets] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);

  // Handle export menu
  const handleExportClick = (event) => {
    setExportMenuAnchor(event.currentTarget);
  };

  const handleExportClose = () => {
    setExportMenuAnchor(null);
  };

  const handleExportCSV = () => {
    exportAllDataToCSV({
      stats: statsData,
      orders: ordersData,
      products: topProductsData,
      revenue: revenueData,
    });
    notify.success('Dashboard data exported to CSV');
    handleExportClose();
  };

  const handleExportJSON = () => {
    exportAllDataToJSON({
      stats: statsData,
      orders: ordersData,
      products: topProductsData,
      revenue: revenueData,
      exportedAt: new Date().toISOString(),
    });
    notify.success('Dashboard data exported to JSON');
    handleExportClose();
  };

  // Simulate real-time notifications
  useEffect(() => {
    const showRandomNotification = () => {
      const randomNotif = demoNotifications[Math.floor(Math.random() * demoNotifications.length)];
      if (notify[randomNotif.type]) {
        notify[randomNotif.type](randomNotif.message);
      } else {
        notify.info(randomNotif.message);
      }
    };

    // Show first notification after 5 seconds
    const initialTimer = setTimeout(showRandomNotification, 5000);

    // Then show notifications every 30-60 seconds randomly
    const interval = setInterval(() => {
      showRandomNotification();
    }, Math.random() * 30000 + 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [notify]);

  // Update widgets when statsData changes
  useEffect(() => {
    if (statsData && statsData.length > 0) {
      setWidgets([
        // Stats cards
        ...statsData.map((stat) => ({ id: `stat-${stat.id}`, type: 'stat', data: stat, size: 'stat' })),
        // Custom widgets
        { id: 'revenue-chart-1', type: 'revenue-chart', size: 'large' },
        { id: 'top-products-1', type: 'top-products', size: 'small' },
        { id: 'orders-table-1', type: 'orders-table', size: 'large' },
        { id: 'activity-feed-1', type: 'activity-feed', size: 'small' },
      ]);
    }
  }, [statsData]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setWidgets((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleAddWidget = (widgetType) => {
    const widget = availableWidgets.find((w) => w.type === widgetType);
    if (widget) {
      const newWidget = {
        ...widget,
        id: `${widget.type}-${Date.now()}`,
      };
      setWidgets((prev) => [...prev, newWidget]);
    }
    setDialogOpen(false);
  };

  const handleRemoveWidget = (widgetId) => {
    setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
  };

  // Separate stats and custom widgets
  const statsWidgets = widgets.filter((w) => w.type === 'stat');
  const customWidgets = widgets.filter((w) => w.type !== 'stat');

  // Group custom widgets into rows
  const getWidgetRows = () => {
    const rows = [];
    let currentRow = [];
    let currentRowSize = 0;

    customWidgets.forEach((widget) => {
      const widgetSize = widget.size === 'large' ? 3 : widget.size === 'medium' ? 2 : 1;

      if (currentRowSize + widgetSize > 4) {
        if (currentRow.length > 0) {
          rows.push([...currentRow]);
        }
        currentRow = [widget];
        currentRowSize = widgetSize;
      } else {
        currentRow.push(widget);
        currentRowSize += widgetSize;

        // Start new row if we have a good combination
        if (currentRowSize >= 4 || (widget.size === 'large' && currentRow.length >= 2)) {
          rows.push([...currentRow]);
          currentRow = [];
          currentRowSize = 0;
        }
      }
    });

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    return rows;
  };

  const getGridColumns = (row) => {
    if (row.length === 1) {
      return row[0].size === 'large' ? '1fr' : '1fr';
    }
    if (row.length === 2) {
      if (row[0].size === 'large' && row[1].size === 'small') return '3fr 1fr';
      if (row[0].size === 'small' && row[1].size === 'large') return '1fr 3fr';
      if (row[0].size === 'large' && row[1].size === 'large') return '1fr 1fr';
      return '1fr 1fr';
    }
    if (row.length === 3) return '1fr 1fr 1fr';
    if (row.length === 4) return '1fr 1fr 1fr 1fr';
    return '1fr';
  };

  const widgetRows = getWidgetRows();
  const activeWidget = widgets.find((w) => w.id === activeId);

  // Loading state - show skeleton
  if (loading) {
    return <DashboardSkeleton />;
  }

  // Error state
  if (error) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          minHeight: 400,
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: '#ff5252' }}>
          Failed to load data
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
          {error}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={refreshData}
          sx={{ mt: 2, borderColor: '#00d4ff', color: '#00d4ff' }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: 2.5, md: 3 },
        width: '100%',
        height: '100%',
        flexGrow: 1,
        overflowX: 'hidden',
      }}
    >
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mb: -1 }}>
        <Tooltip title="Export all data">
          <IconButton
            onClick={handleExportClick}
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#00e676', background: 'rgba(0, 230, 118, 0.1)' },
            }}
          >
            <FileDownload />
          </IconButton>
        </Tooltip>
        <Tooltip title="Refresh data from API">
          <IconButton
            onClick={refreshData}
            size="small"
            sx={{
              color: 'rgba(255,255,255,0.5)',
              '&:hover': { color: '#00d4ff', background: 'rgba(0, 212, 255, 0.1)' },
            }}
          >
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Export Menu */}
      <Menu
        anchorEl={exportMenuAnchor}
        open={Boolean(exportMenuAnchor)}
        onClose={handleExportClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          sx: {
            mt: 1,
            background: 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2,
            minWidth: 200,
          },
        }}
      >
        <MenuItem onClick={handleExportCSV}>
          <ListItemIcon>
            <TableChart sx={{ color: '#00e676', fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText
            primary="Export as CSV"
            secondary="All dashboard data"
            secondaryTypographyProps={{ sx: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' } }}
          />
        </MenuItem>
        <MenuItem onClick={handleExportJSON}>
          <ListItemIcon>
            <Code sx={{ color: '#00d4ff', fontSize: 20 }} />
          </ListItemIcon>
          <ListItemText
            primary="Export as JSON"
            secondary="Full data structure"
            secondaryTypographyProps={{ sx: { fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)' } }}
          />
        </MenuItem>
      </Menu>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={widgets.map((w) => w.id)}>
          {/* Stats Cards Row */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(4, 1fr)',
              },
              gap: { xs: 1.5, sm: 2, md: 3 },
            }}
          >
            {statsWidgets.map((widget) => (
              <SortableWidget key={widget.id} id={widget.id} widget={widget} onRemove={handleRemoveWidget}>
                {getWidgetComponent(widget)}
              </SortableWidget>
            ))}
          </Box>

          {/* Custom Widgets Rows */}
          {widgetRows.map((row, rowIndex) => (
            <Box
              key={rowIndex}
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  lg: getGridColumns(row),
                },
                gap: { xs: 1.5, sm: 2.5, md: 3 },
                minHeight: {
                  xs: row.some((w) => w.type === 'orders-table') ? 'auto' : 'auto',
                  sm: row.some((w) => w.type === 'orders-table') ? 280 : 260,
                  md: row.some((w) => w.type === 'orders-table') ? 300 : 280,
                },
              }}
            >
              {row.map((widget) => (
                <SortableWidget key={widget.id} id={widget.id} widget={widget} onRemove={handleRemoveWidget}>
                  {getWidgetComponent(widget)}
                </SortableWidget>
              ))}
            </Box>
          ))}
        </SortableContext>

        {/* Drag Overlay - shows what's being dragged */}
        <DragOverlay>
          {activeWidget ? (
            <Box
              sx={{
                opacity: 0.8,
                transform: 'scale(1.02)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              {getWidgetComponent(activeWidget)}
            </Box>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Add Widget Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 2,
        }}
      >
        <Button
          variant="outlined"
          startIcon={<Add />}
          onClick={() => setDialogOpen(true)}
          sx={{
            borderColor: 'rgba(0, 212, 255, 0.3)',
            color: '#00d4ff',
            borderStyle: 'dashed',
            borderWidth: 2,
            px: 4,
            py: 1.5,
            borderRadius: 2,
            '&:hover': {
              borderColor: '#00d4ff',
              background: 'rgba(0, 212, 255, 0.1)',
            },
          }}
        >
          Add Widget
        </Button>
      </Box>

      {/* Add Widget Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            background: 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 2,
            mx: { xs: 2, sm: 3 },
            width: { xs: 'calc(100% - 32px)', sm: 'auto' },
          },
        }}
      >
        <DialogTitle sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Widgets sx={{ color: '#00d4ff' }} />
            <Typography variant="h6">Add Widget</Typography>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mb: 2 }}>
            Select a widget to add to your dashboard
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {availableWidgets.map((widget) => (
              <Box
                key={widget.id}
                onClick={() => handleAddWidget(widget.type)}
                sx={{
                  p: 2,
                  borderRadius: 1,
                  border: '1px solid rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    borderColor: '#00d4ff',
                    background: 'rgba(0, 212, 255, 0.1)',
                  },
                }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {widget.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                  {widget.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', p: 2 }}>
          <Button
            onClick={() => setDialogOpen(false)}
            sx={{ color: 'rgba(255,255,255,0.5)' }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
