import api from "@/services/api";

export const fetchTutorDashboard = async () => {
    const res = await api.get(`tutor-dashboard/`);
    console.log("ref of dashboard details", res);
    return res.data;
  };
  
export const fetchAdminDashboard = async () => {
    const res = await api.get(`admin-dashboard/`);
    console.log("ref of dashboard details", res);
    return res.data;
  };
  