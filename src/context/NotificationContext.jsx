import { createContext, useContext, useState, useCallback } from 'react';
import { Snackbar, Alert, Slide, Box, Typography, IconButton } from '@mui/material';
import { Close, CheckCircle, Error, Warning, Info, ShoppingCart, AttachMoney, Person } from '@mui/icons-material';

const NotificationContext = createContext();

const SlideTransition = (props) => <Slide {...props} direction="left" />;

// Icons for different notification types
const notificationIcons = {
  success: <CheckCircle sx={{ fontSize: 20 }} />,
  error: <Error sx={{ fontSize: 20 }} />,
  warning: <Warning sx={{ fontSize: 20 }} />,
  info: <Info sx={{ fontSize: 20 }} />,
  order: <ShoppingCart sx={{ fontSize: 20 }} />,
  payment: <AttachMoney sx={{ fontSize: 20 }} />,
  customer: <Person sx={{ fontSize: 20 }} />,
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [currentNotification, setCurrentNotification] = useState(null);
  const [open, setOpen] = useState(false);

  const showNotification = useCallback((message, type = 'info', duration = 4000) => {
    const notification = {
      id: Date.now(),
      message,
      type,
      duration,
      timestamp: new Date(),
    };

    setNotifications((prev) => [...prev, notification]);
    setCurrentNotification(notification);
    setOpen(true);
  }, []);

  const hideNotification = useCallback(() => {
    setOpen(false);
  }, []);

  const handleExited = useCallback(() => {
    setCurrentNotification(null);
  }, []);

  // Specific notification helpers
  const notify = {
    success: (message) => showNotification(message, 'success'),
    error: (message) => showNotification(message, 'error'),
    warning: (message) => showNotification(message, 'warning'),
    info: (message) => showNotification(message, 'info'),
    order: (message) => showNotification(message, 'order'),
    payment: (message) => showNotification(message, 'payment'),
    customer: (message) => showNotification(message, 'customer'),
  };

  const getAlertSeverity = (type) => {
    switch (type) {
      case 'success':
      case 'payment':
        return 'success';
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'order':
      case 'customer':
      case 'info':
      default:
        return 'info';
    }
  };

  const getCustomStyles = (type) => {
    const baseStyles = {
      borderRadius: 2,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      minWidth: 300,
    };

    switch (type) {
      case 'order':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 77, 255, 0.15) 100%)',
          border: '1px solid rgba(0, 212, 255, 0.3)',
          '& .MuiAlert-icon': { color: '#00d4ff' },
        };
      case 'payment':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, rgba(0, 230, 118, 0.15) 0%, rgba(0, 200, 83, 0.15) 100%)',
          border: '1px solid rgba(0, 230, 118, 0.3)',
          '& .MuiAlert-icon': { color: '#00e676' },
        };
      case 'customer':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, rgba(124, 77, 255, 0.15) 0%, rgba(179, 136, 255, 0.15) 100%)',
          border: '1px solid rgba(124, 77, 255, 0.3)',
          '& .MuiAlert-icon': { color: '#7c4dff' },
        };
      default:
        return baseStyles;
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        showNotification,
        hideNotification,
        notify,
        notifications,
      }}
    >
      {children}
      <Snackbar
        open={open}
        autoHideDuration={currentNotification?.duration || 4000}
        onClose={hideNotification}
        TransitionComponent={SlideTransition}
        TransitionProps={{ onExited: handleExited }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ mt: 8 }}
      >
        {currentNotification && (
          <Alert
            severity={getAlertSeverity(currentNotification.type)}
            icon={notificationIcons[currentNotification.type]}
            sx={getCustomStyles(currentNotification.type)}
            action={
              <IconButton
                size="small"
                onClick={hideNotification}
                sx={{ color: 'inherit', opacity: 0.7, '&:hover': { opacity: 1 } }}
              >
                <Close sx={{ fontSize: 18 }} />
              </IconButton>
            }
          >
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {currentNotification.message}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                Just now
              </Typography>
            </Box>
          </Alert>
        )}
      </Snackbar>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};

export default NotificationContext;
