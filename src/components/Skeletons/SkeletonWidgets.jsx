import { Box, Card, CardContent, Skeleton } from '@mui/material';

// Skeleton for Stats Card
export const StatsCardSkeleton = () => (
  <Card
    sx={{
      height: '100%',
      background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: 2,
    }}
  >
    <CardContent sx={{ p: { xs: 1.25, sm: 2.5 }, '&:last-child': { pb: { xs: 1.25, sm: 2.5 } } }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 1, sm: 2 } }}>
        <Skeleton
          variant="rounded"
          sx={{
            width: { xs: 28, sm: 44 },
            height: { xs: 28, sm: 44 },
            bgcolor: 'rgba(255,255,255,0.05)',
          }}
        />
        <Skeleton
          variant="rounded"
          sx={{
            width: 50,
            height: 20,
            bgcolor: 'rgba(255,255,255,0.05)',
          }}
        />
      </Box>
      <Skeleton
        variant="text"
        sx={{
          fontSize: { xs: '1rem', sm: '1.6rem' },
          width: '70%',
          bgcolor: 'rgba(255,255,255,0.05)',
        }}
      />
      <Skeleton
        variant="text"
        sx={{
          fontSize: '0.875rem',
          width: '50%',
          bgcolor: 'rgba(255,255,255,0.05)',
        }}
      />
      <Skeleton
        variant="rounded"
        sx={{
          mt: 2,
          height: 4,
          width: '100%',
          bgcolor: 'rgba(255,255,255,0.05)',
          display: { xs: 'none', sm: 'block' },
        }}
      />
    </CardContent>
  </Card>
);

// Skeleton for Revenue Chart
export const RevenueChartSkeleton = () => (
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
    <CardContent sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Skeleton variant="text" sx={{ width: 150, fontSize: '1rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" sx={{ width: 100, fontSize: '0.875rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Skeleton variant="rounded" sx={{ width: 80, height: 30, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="rounded" sx={{ width: 80, height: 30, bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 1, minHeight: 200 }}>
        {[...Array(12)].map((_, i) => (
          <Skeleton
            key={i}
            variant="rounded"
            sx={{
              flex: 1,
              height: `${Math.random() * 60 + 40}%`,
              bgcolor: 'rgba(255,255,255,0.05)',
            }}
          />
        ))}
      </Box>
    </CardContent>
  </Card>
);

// Skeleton for Orders Table
export const OrdersTableSkeleton = () => (
  <Card
    sx={{
      height: '100%',
      background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: 2,
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Skeleton variant="text" sx={{ width: 120, fontSize: '1rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="text" sx={{ width: 80, fontSize: '0.875rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Box>
        <Skeleton variant="rounded" sx={{ width: 150, height: 36, bgcolor: 'rgba(255,255,255,0.05)' }} />
      </Box>
      {[...Array(5)].map((_, i) => (
        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Skeleton variant="circular" sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" sx={{ width: '60%', bgcolor: 'rgba(255,255,255,0.05)' }} />
          </Box>
          <Skeleton variant="text" sx={{ width: 60, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Skeleton variant="rounded" sx={{ width: 70, height: 22, bgcolor: 'rgba(255,255,255,0.05)' }} />
        </Box>
      ))}
    </CardContent>
  </Card>
);

// Skeleton for Activity Feed
export const ActivityFeedSkeleton = () => (
  <Card
    sx={{
      height: '100%',
      background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: 2,
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" sx={{ width: 120, fontSize: '1rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton variant="text" sx={{ width: 80, fontSize: '0.875rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
      </Box>
      {[...Array(5)].map((_, i) => (
        <Box key={i} sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
          <Skeleton variant="circular" sx={{ width: 32, height: 32, bgcolor: 'rgba(255,255,255,0.05)' }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" sx={{ width: '90%', bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Skeleton variant="text" sx={{ width: 60, fontSize: '0.75rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
          </Box>
        </Box>
      ))}
    </CardContent>
  </Card>
);

// Skeleton for Top Products
export const TopProductsSkeleton = () => (
  <Card
    sx={{
      height: '100%',
      background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: 2,
    }}
  >
    <CardContent sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Skeleton variant="text" sx={{ width: 100, fontSize: '1rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
        <Skeleton variant="text" sx={{ width: 70, fontSize: '0.875rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
      </Box>
      {[...Array(4)].map((_, i) => (
        <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Skeleton variant="rounded" sx={{ width: 26, height: 26, bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Box>
              <Skeleton variant="text" sx={{ width: 100, bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Skeleton variant="text" sx={{ width: 50, fontSize: '0.75rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Skeleton variant="text" sx={{ width: 60, bgcolor: 'rgba(255,255,255,0.05)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              <Skeleton variant="rounded" sx={{ width: 50, height: 4, bgcolor: 'rgba(255,255,255,0.05)' }} />
              <Skeleton variant="text" sx={{ width: 28, fontSize: '0.75rem', bgcolor: 'rgba(255,255,255,0.05)' }} />
            </Box>
          </Box>
        </Box>
      ))}
    </CardContent>
  </Card>
);

// Dashboard Skeleton (combines all)
export const DashboardSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 1.5, sm: 2.5, md: 3 } }}>
    {/* Stats Row */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: { xs: 1.5, sm: 2, md: 3 },
      }}
    >
      {[...Array(4)].map((_, i) => (
        <StatsCardSkeleton key={i} />
      ))}
    </Box>

    {/* Charts Row */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '3fr 1fr' },
        gap: { xs: 1.5, sm: 2.5, md: 3 },
        minHeight: { xs: 'auto', sm: 280 },
      }}
    >
      <RevenueChartSkeleton />
      <TopProductsSkeleton />
    </Box>

    {/* Table Row */}
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '3fr 1fr' },
        gap: { xs: 1.5, sm: 2.5, md: 3 },
      }}
    >
      <OrdersTableSkeleton />
      <ActivityFeedSkeleton />
    </Box>
  </Box>
);

export default DashboardSkeleton;
