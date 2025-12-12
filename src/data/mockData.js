export const statsData = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '$124,563.00',
    change: '+12.5%',
    trend: 'up',
    icon: 'revenue',
    color: '#00d4ff',
  },
  {
    id: 2,
    title: 'Total Orders',
    value: '1,284',
    change: '+8.2%',
    trend: 'up',
    icon: 'orders',
    color: '#7c4dff',
  },
  {
    id: 3,
    title: 'Active Customers',
    value: '3,842',
    change: '+15.3%',
    trend: 'up',
    icon: 'customers',
    color: '#00e676',
  },
  {
    id: 4,
    title: 'Conversion Rate',
    value: '3.24%',
    change: '-2.1%',
    trend: 'down',
    icon: 'conversion',
    color: '#ffab40',
  },
];

export const revenueData = [
  { month: 'Jan', revenue: 65000, orders: 320 },
  { month: 'Feb', revenue: 72000, orders: 380 },
  { month: 'Mar', revenue: 68000, orders: 350 },
  { month: 'Apr', revenue: 85000, orders: 420 },
  { month: 'May', revenue: 92000, orders: 480 },
  { month: 'Jun', revenue: 88000, orders: 450 },
  { month: 'Jul', revenue: 105000, orders: 520 },
  { month: 'Aug', revenue: 112000, orders: 580 },
  { month: 'Sep', revenue: 98000, orders: 510 },
  { month: 'Oct', revenue: 118000, orders: 620 },
  { month: 'Nov', revenue: 125000, orders: 680 },
  { month: 'Dec', revenue: 124563, orders: 640 },
];

export const ordersData = [
  {
    id: 'ORD-001',
    customer: 'John Smith',
    email: 'john.smith@email.com',
    product: 'Premium Subscription',
    amount: '$299.00',
    status: 'Completed',
    date: '2024-12-10',
  },
  {
    id: 'ORD-002',
    customer: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    product: 'Enterprise Plan',
    amount: '$599.00',
    status: 'Processing',
    date: '2024-12-10',
  },
  {
    id: 'ORD-003',
    customer: 'Mike Williams',
    email: 'mike.w@email.com',
    product: 'Basic Plan',
    amount: '$99.00',
    status: 'Completed',
    date: '2024-12-09',
  },
  {
    id: 'ORD-004',
    customer: 'Emily Brown',
    email: 'emily.b@email.com',
    product: 'Premium Subscription',
    amount: '$299.00',
    status: 'Pending',
    date: '2024-12-09',
  },
  {
    id: 'ORD-005',
    customer: 'David Lee',
    email: 'david.lee@email.com',
    product: 'Enterprise Plan',
    amount: '$599.00',
    status: 'Completed',
    date: '2024-12-08',
  },
  {
    id: 'ORD-006',
    customer: 'Lisa Anderson',
    email: 'lisa.a@email.com',
    product: 'Basic Plan',
    amount: '$99.00',
    status: 'Cancelled',
    date: '2024-12-08',
  },
  {
    id: 'ORD-007',
    customer: 'James Wilson',
    email: 'james.w@email.com',
    product: 'Premium Subscription',
    amount: '$299.00',
    status: 'Completed',
    date: '2024-12-07',
  },
  {
    id: 'ORD-008',
    customer: 'Anna Martinez',
    email: 'anna.m@email.com',
    product: 'Enterprise Plan',
    amount: '$599.00',
    status: 'Processing',
    date: '2024-12-07',
  },
];

export const topProductsData = [
  { name: 'Enterprise Plan', sales: 245, revenue: '$146,755', percentage: 38 },
  { name: 'Premium Subscription', sales: 189, revenue: '$56,511', percentage: 29 },
  { name: 'Basic Plan', sales: 156, revenue: '$15,444', percentage: 19 },
  { name: 'Add-on Services', sales: 98, revenue: '$4,900', percentage: 14 },
];

export const activityData = [
  {
    id: 1,
    type: 'order',
    message: 'New order #ORD-001 from John Smith',
    time: '2 minutes ago',
    icon: 'shopping_cart',
  },
  {
    id: 2,
    type: 'customer',
    message: 'New customer registration: Sarah Johnson',
    time: '15 minutes ago',
    icon: 'person_add',
  },
  {
    id: 3,
    type: 'payment',
    message: 'Payment received for order #ORD-098',
    time: '32 minutes ago',
    icon: 'payment',
  },
  {
    id: 4,
    type: 'refund',
    message: 'Refund processed for order #ORD-076',
    time: '1 hour ago',
    icon: 'replay',
  },
  {
    id: 5,
    type: 'order',
    message: 'Order #ORD-099 shipped successfully',
    time: '2 hours ago',
    icon: 'local_shipping',
  },
  {
    id: 6,
    type: 'review',
    message: 'New 5-star review from Mike Williams',
    time: '3 hours ago',
    icon: 'star',
  },
];

export const weeklyData = [
  { day: 'Mon', sales: 4200 },
  { day: 'Tue', sales: 3800 },
  { day: 'Wed', sales: 5100 },
  { day: 'Thu', sales: 4700 },
  { day: 'Fri', sales: 6200 },
  { day: 'Sat', sales: 5800 },
  { day: 'Sun', sales: 4100 },
];

export const customerInsightsData = {
  segments: [
    { name: 'Premium', value: 35, color: '#00d4ff' },
    { name: 'Regular', value: 45, color: '#7c4dff' },
    { name: 'New', value: 20, color: '#00e676' },
  ],
  metrics: [
    { label: 'Avg. Order Value', value: '$156.80', change: '+5.2%' },
    { label: 'Retention Rate', value: '78.5%', change: '+2.8%' },
    { label: 'Lifetime Value', value: '$1,240', change: '+12.1%' },
  ],
};
