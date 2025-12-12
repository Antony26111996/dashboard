import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import {
  ShoppingCart,
  PersonAdd,
  Payment,
  Replay,
  LocalShipping,
  Star,
} from '@mui/icons-material';
import { useData } from '../../context/DataContext';

const iconMap = {
  shopping_cart: ShoppingCart,
  person_add: PersonAdd,
  payment: Payment,
  replay: Replay,
  local_shipping: LocalShipping,
  star: Star,
};

const iconColors = {
  order: '#00d4ff',
  customer: '#7c4dff',
  payment: '#00e676',
  refund: '#ff5252',
  review: '#ffab40',
};

const ActivityFeed = () => {
  const { activityData } = useData();

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
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flex: 1, display: 'flex', flexDirection: 'column', '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
        <Box sx={{ mb: { xs: 1.5, sm: 2 } }}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
            Recent Activity
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
            Live updates
          </Typography>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto' }}>
          {(activityData || []).map((activity, index) => {
            const IconComponent = iconMap[activity.icon] || ShoppingCart;
            const iconColor = iconColors[activity.type] || '#00d4ff';

            return (
              <Box
                key={activity.id}
                sx={{
                  display: 'flex',
                  gap: { xs: 1, sm: 1.5 },
                  pb: { xs: 1.5, sm: 2 },
                  mb: index < activityData.length - 1 ? 0 : 0,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <Avatar
                    sx={{
                      width: { xs: 28, sm: 32 },
                      height: { xs: 28, sm: 32 },
                      background: `${iconColor}15`,
                      border: `1px solid ${iconColor}30`,
                    }}
                  >
                    <IconComponent sx={{ color: iconColor, fontSize: { xs: 14, sm: 16 } }} />
                  </Avatar>
                  {index < activityData.length - 1 && (
                    <Box
                      sx={{
                        width: 2,
                        flex: 1,
                        minHeight: 16,
                        mt: 1,
                        background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, transparent 100%)',
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ flex: 1, pt: 0.5, minWidth: 0, overflow: 'hidden' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.4,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      wordBreak: 'break-word',
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 2, sm: 3 },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {activity.message}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: { xs: '0.6rem', sm: '0.75rem' } }}>
                    {activity.time}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box
          sx={{
            mt: { xs: 0.5, sm: 1 },
            pt: { xs: 1, sm: 1.5 },
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            textAlign: 'center',
          }}
        >
          <Typography
            component="button"
            sx={{
              background: 'none',
              border: 'none',
              color: '#00d4ff',
              cursor: 'pointer',
              fontSize: { xs: '0.7rem', sm: '0.8rem' },
              fontWeight: 500,
              p: { xs: 0.75, sm: 1 },
              borderRadius: 1,
              '&:hover': { background: 'rgba(0, 212, 255, 0.1)' },
            }}
          >
            View All Activity
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityFeed;
