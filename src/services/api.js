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
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        const { data } = await api.post("token/refresh/", {
          refresh: refreshToken,
        });
        console.log("res == >", data);

        localStorage.setItem(ACCESS_TOKEN, data.access);

        api.defaults.headers["Authorization"] = `Bearer ${data.access}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;

        return api(originalRequest);
      } catch (err) {
        localStorage.clear();
        console.log(err, "refrseh token error");
        let data =
          (await err?.data?.code) === "user_active"
            ? "You account is blocked"
            : "session expired try login again";
        toast.error(data);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
        return Promise.reject(refreshError);
      }
    } else if (error.response.status === 403) {
      console.error(
        "403 forbbiden error found in interceptors",
        error.response.data
      );
    }
    return Promise.reject(error);
  }
);

export default api;
