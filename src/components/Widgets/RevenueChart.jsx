import { Card, CardContent, Typography, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useState } from 'react';
import { useData } from '../../context/DataContext';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        sx={{
          background: 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: 1,
          p: 1.5,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Typography variant="body2" fontWeight={600}>{label}</Typography>
        {payload.map((entry, index) => (
          <Typography key={index} variant="caption" sx={{ color: entry.color, display: 'block' }}>
            {entry.name}: {entry.name === 'revenue' ? `$${entry.value.toLocaleString()}` : entry.value}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};

const RevenueChart = () => {
  const { revenueData, weeklyData } = useData();
  const [chartType, setChartType] = useState('area');
  const [timeRange, setTimeRange] = useState('yearly');

  const data = timeRange === 'weekly' ? weeklyData : revenueData;

  return (
    <Card
      sx={{
        height: '100%',
        background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column', '&:last-child': { pb: 2 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              Revenue Overview
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              {timeRange === 'weekly' ? 'Last 7 days' : 'Monthly revenue for 2024'}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <ToggleButtonGroup
              value={timeRange}
              exclusive
              onChange={(e, val) => val && setTimeRange(val)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  px: 1.5,
                  py: 0.5,
                  fontSize: '0.75rem',
                  '&.Mui-selected': {
                    background: 'rgba(0, 212, 255, 0.15)',
                    color: '#00d4ff',
                  },
                },
              }}
            >
              <ToggleButton value="weekly">Weekly</ToggleButton>
              <ToggleButton value="yearly">Yearly</ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup
              value={chartType}
              exclusive
              onChange={(e, val) => val && setChartType(val)}
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  border: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  px: 1.5,
                  py: 0.5,
                  fontSize: '0.75rem',
                  '&.Mui-selected': {
                    background: 'rgba(0, 212, 255, 0.15)',
                    color: '#00d4ff',
                  },
                },
              }}
            >
              <ToggleButton value="area">Area</ToggleButton>
              <ToggleButton value="bar">Bar</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        <Box sx={{ flex: 1, minHeight: { xs: 200, sm: 250, md: 280 } }}>
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7c4dff" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#7c4dff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey={timeRange === 'weekly' ? 'day' : 'month'}
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                  tickFormatter={(value) => timeRange === 'weekly' ? `$${value}` : `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={timeRange === 'weekly' ? 'sales' : 'revenue'}
                  name="revenue"
                  stroke="#00d4ff"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                {timeRange === 'yearly' && (
                  <Area
                    type="monotone"
                    dataKey="orders"
                    name="orders"
                    stroke="#7c4dff"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorOrders)"
                  />
                )}
              </AreaChart>
            ) : (
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey={timeRange === 'weekly' ? 'day' : 'month'}
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
                  tickFormatter={(value) => timeRange === 'weekly' ? `$${value}` : `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey={timeRange === 'weekly' ? 'sales' : 'revenue'}
                  name="revenue"
                  fill="#00d4ff"
                  radius={[4, 4, 0, 0]}
                />
                {timeRange === 'yearly' && (
                  <Bar
                    dataKey="orders"
                    name="orders"
                    fill="#7c4dff"
                    radius={[4, 4, 0, 0]}
                  />
                )}
              </BarChart>
            )}
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
