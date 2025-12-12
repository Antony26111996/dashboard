import { Card, CardContent, Typography, Box, LinearProgress, IconButton, Tooltip } from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import { useData } from '../../context/DataContext';
import { exportProductsToCSV } from '../../utils/exportUtils';

const colors = ['#00d4ff', '#7c4dff', '#00e676', '#ffab40'];

const TopProducts = () => {
  const { topProductsData } = useData();

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
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>
              Top Products
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)' }}>
              By revenue
            </Typography>
          </Box>
          <Tooltip title="Export to CSV">
            <IconButton
              size="small"
              onClick={() => {
                const exportData = (topProductsData || []).map((p, i) => ({
                  rank: i + 1,
                  name: p.name,
                  revenue: p.revenue,
                  sold: p.sales,
                  growth: `${p.percentage}%`,
                }));
                exportProductsToCSV(exportData);
              }}
              sx={{
                color: 'rgba(255,255,255,0.4)',
                '&:hover': { color: '#00d4ff', background: 'rgba(0, 212, 255, 0.1)' },
              }}
            >
              <FileDownload sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {(topProductsData || []).map((product, index) => (
            <Box
              key={product.name}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 1,
                borderBottom: index < topProductsData.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 }, minWidth: 0, flex: 1 }}>
                <Box
                  sx={{
                    width: { xs: 22, sm: 26 },
                    height: { xs: 22, sm: 26 },
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    fontWeight: 700,
                    background: `${colors[index]}20`,
                    color: colors[index],
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#fff', fontSize: { xs: '0.75rem', sm: '0.85rem' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {product.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: { xs: '0.65rem', sm: '0.75rem' } }}>
                    {product.sales} sales
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#fff', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                  {product.revenue}
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={product.percentage}
                    sx={{
                      width: 50,
                      height: 4,
                      borderRadius: 1,
                      backgroundColor: `${colors[index]}15`,
                      '& .MuiLinearProgress-bar': {
                        background: `linear-gradient(90deg, ${colors[index]} 0%, ${colors[index]}80 100%)`,
                        borderRadius: 1,
                      },
                    }}
                  />
                  <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', minWidth: 28 }}>
                    {product.percentage}%
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopProducts;
