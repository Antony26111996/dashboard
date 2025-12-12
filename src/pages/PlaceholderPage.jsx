import { Box, Typography, Card, CardContent } from '@mui/material';
import { Construction } from '@mui/icons-material';

const PlaceholderPage = ({ title }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 150px)',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          textAlign: 'center',
          background: 'linear-gradient(145deg, #1a1a2e 0%, #12121a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              margin: '0 auto 24px',
              background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(124, 77, 255, 0.15) 100%)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(0, 212, 255, 0.2)',
            }}
          >
            <Construction sx={{ fontSize: 40, color: '#00d4ff' }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 2,
              background: 'linear-gradient(135deg, #ffffff 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This page is under construction. Check back soon for updates!
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PlaceholderPage;
