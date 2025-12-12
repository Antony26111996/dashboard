import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useThemeContext } from '../../context/ThemeContext';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Dashboard,
  DarkMode,
  LightMode,
} from '@mui/icons-material';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  const { login, isAuthenticated } = useAuth();
  const { toggleTheme, isDark } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="login-container"
      sx={{
        background: isDark
          ? 'linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #1a1a2e 100%)'
          : 'linear-gradient(135deg, #e8f4f8 0%, #f0f4f8 50%, #f5f7fa 100%)',
      }}
    >
      {/* Theme Toggle Button */}
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 10,
          color: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.7)',
          background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          '&:hover': {
            background: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)',
            transform: 'rotate(180deg)',
          },
          transition: 'all 0.3s ease',
        }}
      >
        {isDark ? <LightMode /> : <DarkMode />}
      </IconButton>

      <div className="login-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <Card
        className="login-card"
        sx={{
          background: isDark
            ? 'linear-gradient(145deg, rgba(26, 26, 46, 0.9) 0%, rgba(18, 18, 26, 0.95) 100%) !important'
            : 'linear-gradient(145deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%) !important',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.1) !important'
            : '1px solid rgba(0, 0, 0, 0.1) !important',
          boxShadow: isDark
            ? '0 20px 60px rgba(0, 0, 0, 0.5) !important'
            : '0 20px 60px rgba(0, 0, 0, 0.15) !important',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box className="login-header">
            <Box className="logo-container">
              <Dashboard sx={{ fontSize: 40, color: '#00d4ff' }} />
            </Box>
            <Typography
              variant="h4"
              className="login-title"
              sx={{
                background: isDark
                  ? 'linear-gradient(135deg, #ffffff 0%, #00d4ff 100%)'
                  : 'linear-gradient(135deg, #1a1a2e 0%, #00a3cc 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)' }}>
              Sign in to access your dashboard
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched({ ...touched, email: true })}
              error={touched.email && !validateEmail(email) && email !== ''}
              helperText={
                touched.email && !validateEmail(email) && email !== ''
                  ? 'Enter a valid email'
                  : ''
              }
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => setTouched({ ...touched, password: true })}
              error={touched.password && password.length > 0 && password.length < 6}
              helperText={
                touched.password && password.length > 0 && password.length < 6
                  ? 'Password must be at least 6 characters'
                  : ''
              }
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: 'text.secondary' }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              className="login-button"
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: 'white' }} />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)' }}>
              Demo: Use any email and password (min 6 chars)
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
