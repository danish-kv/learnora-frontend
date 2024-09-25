import React, { useEffect, useState } from "react";
import { fetchAdminDashboard } from "../services/dashboardServices";

const useFetchAdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDashboard = async () => {
    setLoading(false);
    try {
      const data = await fetchAdminDashboard();
      setDashboardData(data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);
  return { dashboardData, error, loading };
};

export default useFetchAdminDashboard;
