import { useState, useEffect, useRef } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  ShoppingCart,
  People,
  ShowChart,
} from '@mui/icons-material';

const iconMap = {
  revenue: AttachMoney,
  orders: ShoppingCart,
  customers: People,
  conversion: ShowChart,
};

// Animated counter component
const AnimatedValue = ({ value, duration = 1500 }) => {
  const [displayValue, setDisplayValue] = useState('');
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!value) {
      setDisplayValue(value);
      return;
    }

    // Check if value is a string with currency/percentage
    const isString = typeof value === 'string';
    let prefix = '';
    let suffix = '';
    let targetNumber = 0;
    let decimals = 0;

    if (isString) {
      // Extract prefix (like $)
      const prefixMatch = value.match(/^[^0-9]*/);
      prefix = prefixMatch ? prefixMatch[0] : '';

      // Extract suffix (like %, / 5, etc)
      const suffixMatch = value.match(/[^0-9.,]*$/);
      suffix = suffixMatch ? suffixMatch[0] : '';

      // Extract number
      const numberStr = value.replace(/[^0-9.]/g, '');
      targetNumber = parseFloat(numberStr) || 0;

      // Count decimals
      const decimalMatch = numberStr.match(/\.(\d+)/);
      decimals = decimalMatch ? decimalMatch[1].length : 0;
    } else {
      targetNumber = value;
    }

    if (targetNumber === 0) {
      setDisplayValue(value);
      return;
    }

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentNumber = easeOutCubic * targetNumber;

      // Format the number
      let formatted;
      if (decimals > 0) {
        formatted = currentNumber.toFixed(decimals);
      } else {
        formatted = Math.floor(currentNumber).toLocaleString();
      }

      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // Set final value exactly
      }
    };

    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, duration]);

  return <>{displayValue}</>;
};

const StatsCard = ({ title, value, change, trend, icon, color }) => {
  const IconComponent = iconMap[icon] || AttachMoney;
  const isPositive = trend === 'up';

  return (
    <Card
      sx={{
        height: '100%',
        background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 2,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <CardContent sx={{ p: { xs: 1.25, sm: 2.5 }, '&:last-child': { pb: { xs: 1.25, sm: 2.5 } } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 1, sm: 2 } }}>
          <Box
            sx={{
              width: { xs: 28, sm: 44 },
              height: { xs: 28, sm: 44 },
              borderRadius: { xs: 1, sm: 1.5 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
              border: `1px solid ${color}30`,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <IconComponent sx={{ color: color, fontSize: { xs: 14, sm: 22 } }} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.25,
              px: { xs: 0.5, sm: 1 },
              py: { xs: 0.25, sm: 0.5 },
              borderRadius: { xs: 1, sm: 2 },
              fontSize: { xs: '0.55rem', sm: '0.75rem' },
              fontWeight: 600,
              background: isPositive ? 'rgba(0, 230, 118, 0.12)' : 'rgba(255, 82, 82, 0.12)',
              color: isPositive ? '#00e676' : '#ff5252',
              animation: 'fadeIn 0.5s ease',
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'translateY(-5px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            }}
          >
            {isPositive ? <TrendingUp sx={{ fontSize: { xs: 10, sm: 14 } }} /> : <TrendingDown sx={{ fontSize: { xs: 10, sm: 14 } }} />}
            {change}
          </Box>
        </Box>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1rem', sm: '1.6rem' },
            mb: 0.25,
            color: '#fff',
            lineHeight: 1.2,
          }}
        >
          <AnimatedValue value={value} duration={1500} />
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 500, fontSize: { xs: '0.65rem', sm: '0.875rem' } }}>
          {title}
        </Typography>

        <Box sx={{ mt: { xs: 1, sm: 2 }, height: { xs: 3, sm: 4 }, borderRadius: 1, background: `${color}15`, overflow: 'hidden', display: { xs: 'none', sm: 'block' } }}>
          <Box
            sx={{
              height: '100%',
              borderRadius: 1,
              width: isPositive ? '75%' : '45%',
              background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
              transition: 'width 1.5s ease',
              animation: 'growWidth 1.5s ease',
              '@keyframes growWidth': {
                from: { width: '0%' },
                to: { width: isPositive ? '75%' : '45%' },
              },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
