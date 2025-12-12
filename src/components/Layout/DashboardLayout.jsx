import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';
import CommandPalette from '../CommandPalette/CommandPalette';

const drawerWidth = 240;
const collapsedWidth = 68;

const DashboardLayout = ({ children, title }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const sidebarWidth = isMobile ? 0 : (sidebarCollapsed ? collapsedWidth : drawerWidth);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: (theme) => theme.palette.background.default }}>
      <CommandPalette />
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={handleSidebarToggle}
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
      />
      <Box
        component="main"
        sx={{
          minHeight: '100vh',
          ml: { xs: 0, md: `${sidebarWidth}px` },
          transition: 'margin-left 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header
          title={title}
          collapsed={sidebarCollapsed}
          onMobileMenuClick={handleMobileToggle}
        />
        <Box
          sx={{
            flexGrow: 1,
            pt: { xs: '64px', sm: '72px', md: '80px' },
            px: { xs: 1.5, sm: 2.5, md: 4, lg: 5 },
            pb: { xs: 1.5, sm: 2.5, md: 3 },
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
