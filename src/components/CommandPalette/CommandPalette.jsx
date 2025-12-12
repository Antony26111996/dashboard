import { useState, useEffect, useMemo, useRef } from 'react';
import {
  Dialog,
  Box,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Search,
  Dashboard,
  Analytics,
  People,
  Settings,
  Assessment,
  DarkMode,
  LightMode,
  Refresh,
  FileDownload,
  Logout,
  Keyboard,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useThemeContext } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { exportOrdersToCSV } from '../../utils/exportUtils';
import useKeyboardShortcuts from '../../hooks/useKeyboardShortcuts';

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { toggleTheme, isDark } = useThemeContext();
  const { logout } = useAuth();
  const { refreshData, ordersData } = useData();

  const commands = useMemo(
    () => [
      {
        id: 'dashboard',
        label: 'Go to Dashboard',
        icon: <Dashboard />,
        shortcut: 'G D',
        category: 'Navigation',
        action: () => navigate('/dashboard'),
      },
      {
        id: 'analytics',
        label: 'Go to Analytics',
        icon: <Analytics />,
        shortcut: 'G A',
        category: 'Navigation',
        action: () => navigate('/analytics'),
      },
      {
        id: 'users',
        label: 'Go to Users',
        icon: <People />,
        shortcut: 'G U',
        category: 'Navigation',
        action: () => navigate('/users'),
      },
      {
        id: 'reports',
        label: 'Go to Reports',
        icon: <Assessment />,
        shortcut: 'G R',
        category: 'Navigation',
        action: () => navigate('/reports'),
      },
      {
        id: 'settings',
        label: 'Go to Settings',
        icon: <Settings />,
        shortcut: 'G S',
        category: 'Navigation',
        action: () => navigate('/settings'),
      },
      {
        id: 'toggle-theme',
        label: isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode',
        icon: isDark ? <LightMode /> : <DarkMode />,
        shortcut: 'Ctrl+Shift+L',
        category: 'Actions',
        action: toggleTheme,
      },
      {
        id: 'refresh-data',
        label: 'Refresh Dashboard Data',
        icon: <Refresh />,
        shortcut: 'Ctrl+R',
        category: 'Actions',
        action: refreshData,
      },
      {
        id: 'export-orders',
        label: 'Export Orders to CSV',
        icon: <FileDownload />,
        shortcut: 'Ctrl+E',
        category: 'Actions',
        action: () => ordersData && exportOrdersToCSV(ordersData),
      },
      {
        id: 'shortcuts',
        label: 'View Keyboard Shortcuts',
        icon: <Keyboard />,
        shortcut: '?',
        category: 'Help',
        action: () => alert('Keyboard Shortcuts:\n\nCtrl+K - Open Command Palette\nCtrl+Shift+L - Toggle Theme\nCtrl+R - Refresh Data\nCtrl+E - Export Orders\nEsc - Close Dialogs'),
      },
      {
        id: 'logout',
        label: 'Logout',
        icon: <Logout />,
        shortcut: '',
        category: 'Account',
        action: () => {
          logout();
          navigate('/login');
        },
      },
    ],
    [isDark, navigate, toggleTheme, refreshData, ordersData, logout]
  );

  const filteredCommands = useMemo(() => {
    if (!search.trim()) return commands;
    const searchLower = search.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(searchLower) ||
        cmd.category.toLowerCase().includes(searchLower)
    );
  }, [commands, search]);

  const groupedCommands = useMemo(() => {
    const groups = {};
    filteredCommands.forEach((cmd) => {
      if (!groups[cmd.category]) {
        groups[cmd.category] = [];
      }
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  // Keyboard shortcuts to open/close palette
  useKeyboardShortcuts({
    'ctrl+k': () => setOpen(true),
    'cmd+k': () => setOpen(true),
    escape: () => setOpen(false),
  });

  // Handle navigation with arrow keys
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, filteredCommands, selectedIndex]);

  // Reset selection when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
    }
  }, [open]);

  const executeCommand = (command) => {
    setOpen(false);
    setSearch('');
    command.action();
  };

  const handleClose = () => {
    setOpen(false);
    setSearch('');
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f5f7fa 100%)',
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(255,255,255,0.1)'
              : '1px solid rgba(0,0,0,0.1)',
          borderRadius: 3,
          overflow: 'hidden',
          mt: -10,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          placeholder="Type a command or search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          autoFocus
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#00d4ff' }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Chip
                  label="Esc"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }}
                />
              </InputAdornment>
            ),
            sx: {
              '& fieldset': { border: 'none' },
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(0,0,0,0.05)',
              borderRadius: 2,
            },
          }}
        />
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <List sx={{ maxHeight: 400, overflow: 'auto', py: 1 }}>
        {Object.entries(groupedCommands).map(([category, cmds]) => (
          <Box key={category}>
            <Typography
              variant="caption"
              sx={{
                px: 2,
                py: 1,
                display: 'block',
                color: 'text.secondary',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 1,
              }}
            >
              {category}
            </Typography>
            {cmds.map((cmd) => {
              const index = filteredCommands.indexOf(cmd);
              return (
                <ListItem
                  key={cmd.id}
                  onClick={() => executeCommand(cmd)}
                  selected={index === selectedIndex}
                  sx={{
                    mx: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    '&:hover': {
                      background: 'rgba(0, 212, 255, 0.1)',
                    },
                    '&.Mui-selected': {
                      background: 'rgba(0, 212, 255, 0.15)',
                      '&:hover': {
                        background: 'rgba(0, 212, 255, 0.2)',
                      },
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: '#00d4ff' }}>
                    {cmd.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={cmd.label}
                    primaryTypographyProps={{ fontSize: '0.9rem' }}
                  />
                  {cmd.shortcut && (
                    <Chip
                      label={cmd.shortcut}
                      size="small"
                      sx={{
                        height: 22,
                        fontSize: '0.7rem',
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(255,255,255,0.1)'
                            : 'rgba(0,0,0,0.1)',
                        fontFamily: 'monospace',
                      }}
                    />
                  )}
                </ListItem>
              );
            })}
          </Box>
        ))}
        {filteredCommands.length === 0 && (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">No commands found</Typography>
          </Box>
        )}
      </List>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)' }} />

      <Box
        sx={{
          p: 1.5,
          display: 'flex',
          gap: 2,
          justifyContent: 'center',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(0,0,0,0.2)'
              : 'rgba(0,0,0,0.05)',
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          <kbd style={{ padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>↑↓</kbd> Navigate
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          <kbd style={{ padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>Enter</kbd> Select
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          <kbd style={{ padding: '2px 6px', borderRadius: 4, background: 'rgba(255,255,255,0.1)' }}>Esc</kbd> Close
        </Typography>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
