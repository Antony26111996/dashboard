import { Card, CardContent, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { TrendingUp } from '@mui/icons-material';
import { useData } from '../../context/DataContext';

const CustomerInsights = () => {
  const { customerInsightsData } = useData();
  const { segments = [], metrics = [] } = customerInsightsData || {};

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
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
            Customer Insights
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
            Segment breakdown
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flex: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
          {/* Pie Chart */}
          <Box sx={{ width: { xs: '100%', sm: 120 }, height: { xs: 100, sm: 120 }, flexShrink: 0, mx: { xs: 'auto', sm: 0 } }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segments}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {segments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Box>

          {/* Legend */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, flexWrap: { xs: 'wrap', sm: 'nowrap' }, justifyContent: { xs: 'center', sm: 'center' }, gap: { xs: 0.5, sm: 1 } }}>
            {segments.map((segment) => (
              <Box key={segment.name} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: { xs: 1, sm: 0 } }}>
                <Box
                  sx={{
                    width: { xs: 8, sm: 10 },
                    height: { xs: 8, sm: 10 },
                    borderRadius: '50%',
                    backgroundColor: segment.color,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', fontSize: { xs: '0.7rem', sm: '0.8rem' }, flex: { xs: 'none', sm: 1 } }}>
                  {segment.name}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                  {segment.value}%
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Metrics */}
        <Box sx={{ mt: { xs: 1.5, sm: 2 }, pt: { xs: 1.5, sm: 2 }, borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          {metrics.map((metric, index) => (
            <Box
              key={metric.label}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: { xs: 0.5, sm: 0.75 },
                borderBottom: index < metrics.length - 1 ? '1px solid rgba(255, 255, 255, 0.03)' : 'none',
              }}
            >
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
                {metric.label}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>
                  {metric.value}
                </Typography>
                <Box
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                    alignItems: 'center',
                    color: '#00e676',
                    fontSize: '0.7rem',
                  }}
                >
                  <TrendingUp sx={{ fontSize: 12, mr: 0.25 }} />
                  {metric.change}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default CustomerInsights;
