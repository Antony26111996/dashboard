import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Dashboard,
  Analytics,
  People,
  Settings,
  Assessment,
  ChevronLeft,
  ChevronRight,
  Logout,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';

const drawerWidth = 240;
const collapsedWidth = 68;

const menuItems = [
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
  { text: 'Users', icon: <People />, path: '/users' },
  { text: 'Reports', icon: <Assessment />, path: '/reports' },
  { text: 'Settings', icon: <Settings />, path: '/settings' },
];

const Sidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const theme = useTheme();
  const { isDark } = useThemeContext();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Theme-aware colors
  const colors = {
    background: isDark
      ? 'linear-gradient(180deg, #12121a 0%, #0a0a0f 100%)'
      : 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)',
    border: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.08)',
    textSecondary: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
    hoverBg: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)',
    divider: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)',
    textPrimary: isDark ? '#fff' : '#1a1a2e',
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onMobileClose?.();
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const drawerContent = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed && !isMobile ? 'center' : 'space-between',
          p: collapsed && !isMobile ? '12px 6px' : '12px',
          minHeight: 64,
        }}
      >
        {!collapsed && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 77, 255, 0.15) 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0, 212, 255, 0.2)',
                flexShrink: 0,
              }}
            >
              <Dashboard sx={{ color: '#00d4ff', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                whiteSpace: 'nowrap',
              }}
            >
              Rhombuzz
            </Typography>
          </Box>
        )}
        {collapsed && !isMobile && (
          <Box
            sx={{
              width: 36,
              height: 36,
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 77, 255, 0.15) 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 212, 255, 0.2)',
              margin: '0 auto',
            }}
          >
            <Dashboard sx={{ color: '#00d4ff', fontSize: 22 }} />
          </Box>
        )}
        {!isMobile && (
          <IconButton
            onClick={onToggle}
            size="small"
            sx={{
              color: colors.textSecondary,
              p: '6px',
              '&:hover': {
                color: '#00d4ff',
                background: 'rgba(0, 212, 255, 0.1)',
              },
            }}
          >
            {collapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>

      <Divider sx={{ borderColor: colors.divider }} />

      <List sx={{ py: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding>
              <Tooltip title={collapsed && !isMobile ? item.text : ''} placement="right">
                <ListItemButton
                  selected={isActive}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    mx: collapsed && !isMobile ? '6px' : 1,
                    borderRadius: '8px',
                    py: collapsed && !isMobile ? '10px' : 1,
                    px: collapsed && !isMobile ? 0 : 1.5,
                    justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                    borderLeft: isActive ? '3px solid #00d4ff' : '3px solid transparent',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 77, 255, 0.15) 100%)'
                      : 'transparent',
                    '&:hover': {
                      background: isActive
                        ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 77, 255, 0.15) 100%)'
                        : colors.hoverBg,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed && !isMobile ? 0 : 36,
                      justifyContent: 'center',
                      color: isActive ? '#00d4ff' : colors.textSecondary,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {(!collapsed || isMobile) && (
                    <ListItemText
                      primary={item.text}
                      sx={{
                        '& .MuiTypography-root': {
                          fontWeight: isActive ? 600 : 400,
                          fontSize: '0.9rem',
                          color: isActive ? colors.textPrimary : colors.textSecondary,
                        },
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider sx={{ borderColor: colors.divider }} />

      <List>
        <ListItem disablePadding>
          <Tooltip title={collapsed && !isMobile ? 'Logout' : ''} placement="right">
            <ListItemButton
              onClick={handleLogout}
              sx={{
                mx: collapsed && !isMobile ? '6px' : 1,
                borderRadius: '8px',
                py: collapsed && !isMobile ? '10px' : 1,
                px: collapsed && !isMobile ? 0 : 1.5,
                justifyContent: collapsed && !isMobile ? 'center' : 'flex-start',
                '&:hover': {
                  background: 'rgba(255, 82, 82, 0.1)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: collapsed && !isMobile ? 0 : 36,
                  justifyContent: 'center',
                  color: '#ff5252',
                }}
              >
                <Logout />
              </ListItemIcon>
              {(!collapsed || isMobile) && (
                <ListItemText
                  primary="Logout"
                  sx={{
                    color: '#ff5252',
                    '& .MuiTypography-root': {
                      fontSize: '0.9rem',
                    },
                  }}
                />
              )}
            </ListItemButton>
          </Tooltip>
        </ListItem>
      </List>
    </>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #12121a 0%, #0a0a0f 100%)',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  // Desktop drawer
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        width: collapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? collapsedWidth : drawerWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          background: 'linear-gradient(180deg, #12121a 0%, #0a0a0f 100%)',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
