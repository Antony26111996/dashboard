/**
 * Utility functions for exporting data
 */

/**
 * Convert array of objects to CSV string
 * @param {Array} data - Array of objects to convert
 * @param {Array} columns - Column definitions with { key, label }
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data, columns) => {
  if (!data || data.length === 0) return '';

  // Header row
  const headers = columns.map((col) => `"${col.label}"`).join(',');

  // Data rows
  const rows = data.map((row) => {
    return columns
      .map((col) => {
        let value = row[col.key] ?? '';
        // Escape quotes and wrap in quotes
        if (typeof value === 'string') {
          value = value.replace(/"/g, '""');
        }
        return `"${value}"`;
      })
      .join(',');
  });

  return [headers, ...rows].join('\n');
};

/**
 * Download data as CSV file
 * @param {string} csvContent - CSV formatted string
 * @param {string} filename - Name of the file to download
 */
export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Export orders data to CSV
 * @param {Array} orders - Orders data array
 */
export const exportOrdersToCSV = (orders) => {
  const columns = [
    { key: 'id', label: 'Order ID' },
    { key: 'customer', label: 'Customer' },
    { key: 'product', label: 'Product' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
  ];

  const csvContent = convertToCSV(orders, columns);
  const timestamp = new Date().toISOString().split('T')[0];
  downloadCSV(csvContent, `orders_export_${timestamp}.csv`);
};

/**
 * Export products data to CSV
 * @param {Array} products - Products data array
 */
export const exportProductsToCSV = (products) => {
  const columns = [
    { key: 'rank', label: 'Rank' },
    { key: 'name', label: 'Product Name' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'sold', label: 'Units Sold' },
    { key: 'growth', label: 'Growth %' },
  ];

  const csvContent = convertToCSV(products, columns);
  const timestamp = new Date().toISOString().split('T')[0];
  downloadCSV(csvContent, `products_export_${timestamp}.csv`);
};

/**
 * Export revenue data to CSV
 * @param {Array} revenueData - Revenue data array
 */
export const exportRevenueToCSV = (revenueData) => {
  const columns = [
    { key: 'month', label: 'Month' },
    { key: 'revenue', label: 'Revenue' },
    { key: 'orders', label: 'Orders' },
  ];

  const csvContent = convertToCSV(revenueData, columns);
  const timestamp = new Date().toISOString().split('T')[0];
  downloadCSV(csvContent, `revenue_export_${timestamp}.csv`);
};

/**
 * Export all dashboard data to a single CSV file with multiple sections
 * @param {Object} data - Object containing all dashboard data
 */
export const exportAllDataToCSV = (data) => {
  const { stats, orders, products, revenue } = data;
  const timestamp = new Date().toISOString().split('T')[0];
  let csvContent = '';

  // Stats Section
  if (stats && stats.length > 0) {
    csvContent += '"DASHBOARD STATISTICS"\n';
    csvContent += '"Metric","Value","Change","Trend"\n';
    stats.forEach((stat) => {
      csvContent += `"${stat.title}","${stat.value}","${stat.change}","${stat.trend}"\n`;
    });
    csvContent += '\n';
  }

  // Orders Section
  if (orders && orders.length > 0) {
    csvContent += '"RECENT ORDERS"\n';
    csvContent += '"Order ID","Customer","Product","Amount","Status","Date"\n';
    orders.forEach((order) => {
      csvContent += `"${order.id}","${order.customer}","${order.product}","${order.amount}","${order.status}","${order.date || ''}"\n`;
    });
    csvContent += '\n';
  }

  // Products Section
  if (products && products.length > 0) {
    csvContent += '"TOP PRODUCTS"\n';
    csvContent += '"Rank","Product Name","Revenue","Sales","Percentage"\n';
    products.forEach((product, index) => {
      csvContent += `"${index + 1}","${product.name}","${product.revenue}","${product.sales}","${product.percentage}%"\n`;
    });
    csvContent += '\n';
  }

  // Revenue Section
  if (revenue && revenue.length > 0) {
    csvContent += '"REVENUE DATA"\n';
    csvContent += '"Month","Revenue","Orders"\n';
    revenue.forEach((item) => {
      csvContent += `"${item.month}","$${item.revenue?.toLocaleString() || item.revenue}","${item.orders}"\n`;
    });
  }

  downloadCSV(csvContent, `dashboard_full_export_${timestamp}.csv`);
};

/**
 * Export dashboard data to JSON format
 * @param {Object} data - Object containing all dashboard data
 */
export const exportAllDataToJSON = (data) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `dashboard_export_${timestamp}.json`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
