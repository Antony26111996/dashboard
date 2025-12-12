import { createContext, useContext, useState, useEffect } from 'react';
import { transformDataForDashboard } from '../services/api';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    statsData: [],
    topProductsData: [],
    ordersData: [],
    revenueData: [],
    weeklyData: [],
    activityData: [],
    customerInsightsData: { segments: [], metrics: [] },
    rawData: { products: [], carts: [], users: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const dashboardData = await transformDataForDashboard();
      setData(dashboardData);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    fetchData();
  };

  return (
    <DataContext.Provider value={{ ...data, loading, error, refreshData }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
