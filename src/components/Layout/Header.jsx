import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  InputBase,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Notifications,
  Search,
  KeyboardArrowDown,
  Person,
  Settings,
  Logout,
  Menu as MenuIcon,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const drawerWidth = 240;
const collapsedWidth = 68;

const Header = ({ title, collapsed, onMobileMenuClick }) => {
  const { user, logout } = useAuth();
  const { toggleTheme, isDark } = useThemeContext();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const notifications = [
    { id: 1, text: 'New order received - #ORD-001', time: '2 min ago' },
    { id: 2, text: 'Payment confirmed for #ORD-098', time: '15 min ago' },
    { id: 3, text: 'New customer registration', time: '1 hour ago' },
  ];

  const sidebarWidth = isMobile ? 0 : (collapsed ? collapsedWidth : drawerWidth);

  return (
    <AppBar
      position="fixed"
      className="header"
      sx={{
        width: { xs: '100%', md: `calc(100% - ${sidebarWidth}px)` },
        ml: { xs: 0, md: `${sidebarWidth}px` },
        transition: 'width 0.3s ease, margin-left 0.3s ease',
        background: isDark
          ? 'linear-gradient(145deg, rgba(18, 18, 26, 0.95) 0%, rgba(10, 10, 15, 0.98) 100%)'
          : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 247, 250, 0.98) 100%)',
        borderBottom: isDark
          ? '1px solid rgba(255, 255, 255, 0.05)'
          : '1px solid rgba(0, 0, 0, 0.08)',
        color: isDark ? '#fff' : '#1a1a2e',
      }}
    >
      <Toolbar className="header-toolbar">
        <Box className="header-left">
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={onMobileMenuClick}
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" className="page-title">
            {title}
          </Typography>
        </Box>

        {!isMobile && (
          <Box className="header-center">
            <Box
              className="search-box"
              onClick={() => {
                // Trigger command palette via keyboard event
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
              }}
              sx={{
                cursor: 'pointer',
                background: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
              }}
            >
              <Search className="search-icon" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }} />
              <InputBase
                placeholder="Search..."
                className="search-input"
                readOnly
                sx={{
                  cursor: 'pointer',
                  color: isDark ? '#fff' : '#1a1a2e',
                  '& input::placeholder': {
                    color: isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
                    opacity: 1,
                  },
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  ml: 1,
                  px: 1,
                  py: 0.25,
                  borderRadius: 1,
                  bgcolor: 'rgba(255,255,255,0.1)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.5)',
                  fontFamily: 'monospace',
                }}
              >
                Ctrl+K
              </Box>
            </Box>
          </Box>
        )}

        <Box className="header-right">
          <IconButton
            onClick={toggleTheme}
            size="small"
            sx={{
              color: 'inherit',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                transform: 'rotate(180deg)',
              },
            }}
          >
            {isDark ? <LightMode /> : <DarkMode />}
          </IconButton>

          <IconButton
            className="notification-btn"
            onClick={handleNotificationOpen}
            size="small"
          >
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Box className="user-section" onClick={handleMenuOpen}>
            <Avatar className="user-avatar" sx={{ width: 36, height: 36 }}>
              {getInitials(user?.name)}
            </Avatar>
            {!isMobile && (
              <>
                <Box className="user-info">
                  <Typography variant="body2" className="user-name">
                    {user?.name || 'User'}
                  </Typography>
                  <Typography variant="caption" className="user-role">
                    {user?.role || 'Admin'}
                  </Typography>
                </Box>
                <KeyboardArrowDown className="dropdown-icon" />
              </>
            )}
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            className="user-menu"
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                background: isDark
                  ? 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                borderRadius: 2,
                minWidth: 180,
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <Person sx={{ mr: 1.5, fontSize: 20 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Settings sx={{ mr: 1.5, fontSize: 20 }} />
              Settings
            </MenuItem>
            <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
            <MenuItem onClick={handleLogout} sx={{ color: '#ff5252' }}>
              <Logout sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            PaperProps={{
              sx: {
                mt: 1,
                background: isDark
                  ? 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
                border: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                borderRadius: 2,
                minWidth: 280,
                maxWidth: 320,
              },
            }}
          >
            <Box sx={{ p: 2, borderBottom: isDark ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)' }}>
              <Typography variant="subtitle1" fontWeight={600}>
                Notifications
              </Typography>
            </Box>
            {notifications.map((notif) => (
              <MenuItem key={notif.id} onClick={handleNotificationClose}>
                <Box>
                  <Typography variant="body2">{notif.text}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {notif.time}
                  </Typography>
                </Box>
              </MenuItem>
            ))}
            <Divider sx={{ borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }} />
            <MenuItem
              onClick={handleNotificationClose}
              sx={{ justifyContent: 'center', color: '#00d4ff' }}
            >
              View All Notifications
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
