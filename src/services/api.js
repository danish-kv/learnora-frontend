import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";
import { toast } from "react-toastify";
import { displayToastAlert } from "../utils/displayToastAlert";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Request error:", error);

    return Promise.reject(error);
  }
);

const refreshToken = async (refresh) => {
  try {
    const res = await api.post("token/refresh/", {
      refresh: refresh,
    });
    console.log("ress of ====", res);

    return res.data.access;
  } catch (error) {
    console.log(error);
    
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Response error:", error);

    const originalRequest = error.config;
    displayToastAlert(400, error.response?.data?.error)

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem(REFRESH_TOKEN);
      if (refresh) {
        console.log('yes its here', refresh);
        
        const newAccessToken = await refreshToken(refresh);
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);
      
      try {
        const newAccessToken = await refreshToken(refresh);
        localStorage.setItem(ACCESS_TOKEN, newAccessToken);

        api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        console.log("refresh token fialed", err);
      }
    }
    } else if (error.response && error.response.status === 403) {
      console.error("403 Forbidden error:", error.response.data?.detail);
      
      displayToastAlert(403,error.response.data?.detail|| 'permission error')
    }
    return Promise.reject(error);
  }
);

export default api;
