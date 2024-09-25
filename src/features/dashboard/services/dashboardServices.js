import api from "@/services/api";

export const fetchDashboard = async () => {
    const res = await api.get(`tutor-dashboard/`);
    console.log("ref of dashboard details", res);
    return res.data;
  };
  