import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  TablePagination,
  useMediaQuery,
  useTheme,
  Tooltip,
} from '@mui/material';
import { Search, MoreVert, Visibility, FileDownload } from '@mui/icons-material';
import { exportOrdersToCSV } from '../../utils/exportUtils';
import { useData } from '../../context/DataContext';

const statusColors = {
  Completed: { bg: 'rgba(0, 230, 118, 0.15)', color: '#00e676' },
  Processing: { bg: 'rgba(0, 212, 255, 0.15)', color: '#00d4ff' },
  Pending: { bg: 'rgba(255, 171, 64, 0.15)', color: '#ffab40' },
  Cancelled: { bg: 'rgba(255, 82, 82, 0.15)', color: '#ff5252' },
};

// Mobile card view for orders
const MobileOrderCard = ({ order, getInitials }) => (
  <Box
    sx={{
      p: 1.5,
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      '&:last-child': { borderBottom: 'none' },
    }}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            fontSize: '0.7rem',
            background: 'linear-gradient(135deg, #00d4ff 0%, #7c4dff 100%)',
          }}
        >
          {getInitials(order.customer)}
        </Avatar>
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
            {order.customer}
          </Typography>
          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem' }}>
            {order.id}
          </Typography>
        </Box>
      </Box>
      <Chip
        label={order.status}
        size="small"
        sx={{
          height: 20,
          fontSize: '0.65rem',
          backgroundColor: statusColors[order.status]?.bg,
          color: statusColors[order.status]?.color,
          fontWeight: 500,
        }}
      />
    </Box>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="body2" sx={{ fontWeight: 700, color: '#00d4ff', fontSize: '0.85rem' }}>
        {order.amount}
      </Typography>
      <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem' }}>
        {order.date || 'Recent'}
      </Typography>
    </Box>
  </Box>
);

const OrdersTable = () => {
  const { ordersData } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const filteredOrders = (ordersData || []).filter(
    (order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const paginatedOrders = filteredOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Card
      sx={{
        height: '100%',
        background: 'linear-gradient(145deg, #1a1a2e 0%, #16162a 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: { xs: 1.5, sm: 2 }, flex: 1, display: 'flex', flexDirection: 'column', '&:last-child': { pb: 1 } }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5, flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, fontSize: { xs: '0.9rem', sm: '1rem' } }}>
              Recent Orders
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
              {filteredOrders.length} orders
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: { xs: '100%', sm: 'auto' } }}>
            <Tooltip title="Export to CSV">
              <IconButton
                size="small"
                onClick={() => exportOrdersToCSV(filteredOrders)}
                sx={{
                  color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  '&:hover': {
                    color: '#00d4ff',
                    borderColor: 'rgba(0, 212, 255, 0.3)',
                    background: 'rgba(0, 212, 255, 0.1)',
                  },
                }}
              >
                <FileDownload sx={{ fontSize: 18 }} />
              </IconButton>
            </Tooltip>
            <TextField
            size="small"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              width: { xs: '100%', sm: 'auto' },
              minWidth: { xs: 'auto', sm: 140 },
              '& .MuiOutlinedInput-root': {
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: 1,
                fontSize: '0.8rem',
                height: { xs: 36, sm: 40 },
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(0, 212, 255, 0.3)' },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }} />
                </InputAdornment>
              ),
            }}
          />
          </Box>
        </Box>

        {/* Mobile Card View */}
        {isMobile ? (
          <Box sx={{ flex: 1, overflow: 'auto' }}>
            {paginatedOrders.map((order) => (
              <MobileOrderCard key={order.id} order={order} getInitials={getInitials} />
            ))}
          </Box>
        ) : (
          /* Desktop Table View */
          <TableContainer sx={{ flex: 1 }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.75rem', py: 1.5 }}>Order ID</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.75rem', py: 1.5 }}>Customer</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.75rem', py: 1.5, display: { xs: 'none', md: 'table-cell' } }}>Product</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.75rem', py: 1.5 }}>Amount</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.75rem', py: 1.5 }}>Status</TableCell>
                  <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.6)', fontWeight: 600, fontSize: '0.75rem', py: 1.5, display: { xs: 'none', lg: 'table-cell' } }} align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedOrders.map((order) => (
                  <TableRow key={order.id} sx={{ '&:hover': { background: 'rgba(255,255,255,0.02)' } }}>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)', py: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        {order.id}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)', py: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 28, height: 28, fontSize: '0.7rem', background: 'linear-gradient(135deg, #00d4ff 0%, #7c4dff 100%)' }}>
                          {getInitials(order.customer)}
                        </Avatar>
                        <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8rem' }}>
                          {order.customer}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)', py: 1.5, display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)' }}>{order.product}</Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)', py: 1.5 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8rem' }}>
                        {order.amount}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)', py: 1.5 }}>
                      <Chip
                        label={order.status}
                        size="small"
                        sx={{
                          height: 22,
                          fontSize: '0.7rem',
                          backgroundColor: statusColors[order.status]?.bg,
                          color: statusColors[order.status]?.color,
                          fontWeight: 500,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ borderBottom: '1px solid rgba(255,255,255,0.03)', py: 1.5, display: { xs: 'none', lg: 'table-cell' } }} align="center">
                      <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#00d4ff' } }}>
                        <Visibility sx={{ fontSize: 16 }} />
                      </IconButton>
                      <IconButton size="small" sx={{ color: 'rgba(255,255,255,0.4)', '&:hover': { color: '#00d4ff' } }}>
                        <MoreVert sx={{ fontSize: 16 }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <TablePagination
          component="div"
          count={filteredOrders.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={isMobile ? [] : [5, 10]}
          labelRowsPerPage={isMobile ? '' : 'Rows:'}
          sx={{
            borderTop: '1px solid rgba(255,255,255,0.05)',
            mt: 'auto',
            '& .MuiTablePagination-toolbar': {
              minHeight: { xs: 36, sm: 48 },
              px: { xs: 0, sm: 1 },
              justifyContent: { xs: 'center', sm: 'flex-end' },
            },
            '& .MuiTablePagination-selectLabel': {
              display: { xs: 'none', sm: 'block' },
              color: 'rgba(255,255,255,0.5)',
              fontSize: '0.7rem',
              m: 0,
            },
            '& .MuiTablePagination-displayedRows': {
              color: 'rgba(255,255,255,0.5)',
              fontSize: { xs: '0.65rem', sm: '0.7rem' },
              m: 0,
            },
            '& .MuiTablePagination-select': {
              fontSize: '0.7rem',
            },
            '& .MuiTablePagination-actions': {
              ml: { xs: 0.5, sm: 1 },
            },
            '& .MuiTablePagination-actions button': {
              p: { xs: 0.25, sm: 0.5 },
            },
            '& .MuiInputBase-root': {
              display: { xs: 'none', sm: 'flex' },
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default OrdersTable;
