// Fake Store API - https://fakestoreapi.com
const BASE_URL = 'https://fakestoreapi.com';

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch all carts (orders)
export const fetchCarts = async () => {
  try {
    const response = await fetch(`${BASE_URL}/carts`);
    if (!response.ok) throw new Error('Failed to fetch carts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching carts:', error);
    return [];
  }
};

// Fetch all users
export const fetchUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    if (!response.ok) throw new Error('Failed to fetch users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

// Fetch product categories
export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Fetch single product
export const fetchProduct = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Fetch single user
export const fetchUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${id}`);
    if (!response.ok) throw new Error('Failed to fetch user');
    return await response.json();
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

// Helper to capitalize first letter
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

// Transform API data for dashboard widgets
export const transformDataForDashboard = async () => {
  const [products, carts, users] = await Promise.all([
    fetchProducts(),
    fetchCarts(),
    fetchUsers(),
  ]);

  // Create a product lookup map for quick access
  const productMap = {};
  products.forEach((product) => {
    productMap[product.id] = product;
  });

  // Calculate actual revenue from carts and products
  let totalCartRevenue = 0;
  let totalItemsSold = 0;

  carts.forEach((cart) => {
    cart.products.forEach((item) => {
      const product = productMap[item.productId];
      if (product) {
        totalCartRevenue += product.price * item.quantity;
        totalItemsSold += item.quantity;
      }
    });
  });

  // Scale up for realistic dashboard numbers
  const revenueMultiplier = 150;
  const totalRevenue = totalCartRevenue * revenueMultiplier;
  const totalOrders = carts.length * 25;
  const totalCustomers = users.length * 80;
  const avgRating = products.reduce((sum, p) => sum + p.rating.rate, 0) / products.length;

  // Stats data
  const statsData = [
    {
      id: 1,
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: '+12.5%',
      trend: 'up',
      icon: 'revenue',
      color: '#00d4ff',
    },
    {
      id: 2,
      title: 'Total Orders',
      value: totalOrders.toLocaleString(),
      change: '+8.2%',
      trend: 'up',
      icon: 'orders',
      color: '#7c4dff',
    },
    {
      id: 3,
      title: 'Active Customers',
      value: totalCustomers.toLocaleString(),
      change: '+15.3%',
      trend: 'up',
      icon: 'customers',
      color: '#00e676',
    },
    {
      id: 4,
      title: 'Avg. Rating',
      value: `${avgRating.toFixed(1)} / 5`,
      change: '+0.3',
      trend: 'up',
      icon: 'conversion',
      color: '#ffab40',
    },
  ];

  // Transform products for top products widget - use rating count as sales indicator
  const topProductsData = products
    .sort((a, b) => b.rating.count - a.rating.count) // Sort by rating count (popularity)
    .slice(0, 4)
    .map((product, index) => {
      const salesCount = product.rating.count * 3; // Simulate more sales
      const revenue = product.price * salesCount;
      const totalTopRevenue = products.slice(0, 4).reduce((sum, p) => sum + p.price * p.rating.count * 3, 0);
      const percentage = Math.round((revenue / totalTopRevenue) * 100);

      return {
        name: product.title.length > 28 ? product.title.substring(0, 28) + '...' : product.title,
        fullName: product.title,
        sales: salesCount,
        revenue: `$${revenue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
        percentage: percentage,
        image: product.image,
        category: product.category,
        rating: product.rating.rate,
      };
    });

  // Transform carts to orders with actual product and user data
  const ordersData = carts.slice(0, 10).map((cart, index) => {
    // Find the user for this cart
    const user = users.find((u) => u.id === cart.userId) || users[0];

    // Get the first product in the cart for display
    const firstProductId = cart.products[0]?.productId;
    const firstProduct = productMap[firstProductId] || products[0];

    // Calculate total amount for this cart
    const amount = cart.products.reduce((sum, item) => {
      const prod = productMap[item.productId];
      return sum + (prod?.price || 0) * item.quantity;
    }, 0);

    // Calculate total items in cart
    const totalItems = cart.products.reduce((sum, item) => sum + item.quantity, 0);

    const statuses = ['Completed', 'Processing', 'Pending', 'Cancelled'];
    const statusWeights = [0.5, 0.25, 0.15, 0.1]; // More completed orders
    let statusIndex = 0;
    const rand = Math.random();
    let cumulative = 0;
    for (let i = 0; i < statusWeights.length; i++) {
      cumulative += statusWeights[i];
      if (rand < cumulative) {
        statusIndex = i;
        break;
      }
    }

    // Format the date properly
    const orderDate = new Date(cart.date);
    const formattedDate = orderDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    return {
      id: `ORD-${String(cart.id).padStart(3, '0')}`,
      customer: `${capitalize(user.name.firstname)} ${capitalize(user.name.lastname)}`,
      email: user.email,
      phone: user.phone,
      product: firstProduct?.title?.length > 25
        ? firstProduct.title.substring(0, 25) + '...'
        : firstProduct?.title || 'Product Bundle',
      productImage: firstProduct?.image,
      amount: `$${amount.toFixed(2)}`,
      status: statuses[statusIndex],
      date: formattedDate,
      rawDate: cart.date,
      userId: user.id,
      totalItems: totalItems,
      city: capitalize(user.address.city),
    };
  });

  // Generate revenue data based on cart dates
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const baseMonthlyRevenue = totalRevenue / 12;
  const baseMonthlyOrders = totalOrders / 12;

  const revenueData = months.map((month, index) => {
    // Create realistic growth pattern
    const growthFactor = 0.7 + (index * 0.05) + (Math.random() * 0.2);
    return {
      month,
      revenue: Math.floor(baseMonthlyRevenue * growthFactor),
      orders: Math.floor(baseMonthlyOrders * growthFactor),
    };
  });

  // Weekly data with realistic daily patterns
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const dayMultipliers = [0.9, 1.0, 1.1, 1.15, 1.3, 1.4, 1.2]; // Weekend boost
  const baseDailySales = totalRevenue / 365;

  const weeklyData = weekDays.map((day, index) => ({
    day,
    sales: Math.floor(baseDailySales * dayMultipliers[index] * (0.9 + Math.random() * 0.2)),
  }));

  // Activity data based on real users and orders
  const activityTypes = [
    { type: 'order', icon: 'shopping_cart', getMessage: (data) => `New order #${data.orderId} from ${data.user}` },
    { type: 'customer', icon: 'person_add', getMessage: (data) => `New customer registered: ${data.user}` },
    { type: 'payment', icon: 'payment', getMessage: (data) => `Payment of ${data.amount} received for #${data.orderId}` },
    { type: 'order', icon: 'local_shipping', getMessage: (data) => `Order #${data.orderId} shipped to ${data.city}` },
    { type: 'review', icon: 'star', getMessage: (data) => `${data.user} left a ${data.rating}-star review` },
  ];

  const activityData = users.slice(0, 6).map((user, index) => {
    const activity = activityTypes[index % activityTypes.length];
    const times = ['2 min ago', '15 min ago', '32 min ago', '1 hour ago', '2 hours ago', '3 hours ago'];
    const userName = `${capitalize(user.name.firstname)} ${capitalize(user.name.lastname)}`;

    const data = {
      user: userName,
      orderId: `ORD-${String(100 + index).padStart(3, '0')}`,
      amount: `$${(Math.random() * 200 + 50).toFixed(2)}`,
      city: capitalize(user.address.city),
      rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
    };

    return {
      id: index + 1,
      type: activity.type,
      message: activity.getMessage(data),
      time: times[index],
      icon: activity.icon,
    };
  });

  // Customer insights based on actual user data
  const uniqueCities = [...new Set(users.map((u) => u.address.city))];
  const customerInsightsData = {
    segments: [
      { name: 'Premium', value: 35, color: '#00d4ff' },
      { name: 'Regular', value: 45, color: '#7c4dff' },
      { name: 'New', value: 20, color: '#00e676' },
    ],
    metrics: [
      {
        label: 'Avg. Order Value',
        value: `$${(totalRevenue / totalOrders).toFixed(2)}`,
        change: '+5.2%'
      },
      {
        label: 'Customer Locations',
        value: `${uniqueCities.length} cities`,
        change: '+2'
      },
      {
        label: 'Avg. Items/Order',
        value: `${(totalItemsSold / carts.length).toFixed(1)}`,
        change: '+0.3'
      },
    ],
  };

  // Category breakdown from products
  const categoryData = products.reduce((acc, product) => {
    const cat = product.category;
    if (!acc[cat]) {
      acc[cat] = { count: 0, revenue: 0 };
    }
    acc[cat].count += 1;
    acc[cat].revenue += product.price * product.rating.count;
    return acc;
  }, {});

  return {
    statsData,
    topProductsData,
    ordersData,
    revenueData,
    weeklyData,
    activityData,
    customerInsightsData,
    categoryData,
    rawData: { products, carts, users },
  };
};
