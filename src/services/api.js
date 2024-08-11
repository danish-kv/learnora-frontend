import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";
import { toast } from "react-toastify";

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
    console.log('Request error:', error); 
    
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log('Response error:', error); 
    
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        console.log('refresh token', refreshToken);
        
        const { data } = await api.post("token/refresh/", {
          refresh: refreshToken,
        });
        console.log("res == >", data);

        console.log('Refresh token response:', data); 

        api.defaults.headers["Authorization"] = `Bearer ${data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        console.log('Refresh token error:', err);  //
        let data =
          (await err?.data?.code) === "user_active"
            ? "You account is blocked"
            : "session expired try login again";
        toast.error(data);
        setTimeout(() => {
          window.location.href = "/";
        },  2000);
        return Promise.reject(err);
      }
    } else if (error.response.status === 403) {
      console.error('403 Forbidden error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
