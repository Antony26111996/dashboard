import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

const ThemeContext = createContext();

// Get base theme settings
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#00d4ff',
      light: '#5ce1ff',
      dark: '#00a3cc',
      contrastText: mode === 'dark' ? '#0a0a0f' : '#ffffff',
    },
    secondary: {
      main: '#7c4dff',
      light: '#b47cff',
      dark: '#3f1dcb',
    },
    background: {
      default: mode === 'dark' ? '#0a0a0f' : '#f5f7fa',
      paper: mode === 'dark' ? '#12121a' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : '#1a1a2e',
      secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(26, 26, 46, 0.7)',
    },
    success: {
      main: '#00e676',
      light: '#66ffa6',
      dark: '#00b248',
    },
    error: {
      main: '#ff5252',
      light: '#ff867f',
      dark: '#c50e29',
    },
    warning: {
      main: '#ffab40',
      light: '#ffdd71',
      dark: '#c77c02',
    },
    info: {
      main: '#00d4ff',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, fontSize: '2.5rem' },
    h2: { fontWeight: 700, fontSize: '2rem' },
    h3: { fontWeight: 600, fontSize: '1.5rem' },
    h4: { fontWeight: 600, fontSize: '1.25rem' },
    h5: { fontWeight: 600, fontSize: '1rem' },
    h6: { fontWeight: 600, fontSize: '0.875rem' },
    body1: { fontSize: '0.938rem' },
    body2: { fontSize: '0.813rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 212, 255, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(135deg, #00d4ff 0%, #7c4dff 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #00a3cc 0%, #5c2dcb 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: ({ theme }) => ({
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)'
            : 'linear-gradient(145deg, #ffffff 0%, #f8f9fc 100%)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.05)'
            : '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 24px rgba(0, 0, 0, 0.4)'
            : '0 4px 24px rgba(0, 0, 0, 0.08)',
        }),
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: ({ theme }) => ({
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 212, 255, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#00d4ff',
            },
          },
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: ({ theme }) => ({
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #12121a 0%, #0a0a0f 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f5f7fa 100%)',
          borderRight: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.05)'
            : '1px solid rgba(0, 0, 0, 0.08)',
        }),
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 77, 255, 0.15) 100%)',
            borderLeft: '3px solid #00d4ff',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2) 0%, rgba(124, 77, 255, 0.2) 100%)',
            },
          },
          '&:hover': {
            background: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(0, 0, 0, 0.04)',
          },
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderBottom: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.05)'
            : '1px solid rgba(0, 0, 0, 0.08)',
        }),
        head: {
          fontWeight: 600,
          background: 'rgba(0, 212, 255, 0.05)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem('themeMode');
    // Default to dark mode, only use saved if it's a valid value
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const value = useMemo(
    () => ({
      mode,
      toggleTheme,
      isDark: mode === 'dark',
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeContextProvider');
  }
  return context;
};

export default ThemeContext;
