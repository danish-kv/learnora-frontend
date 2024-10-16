import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constant";
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
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}token/refresh/`,
      {
        refresh: refresh,
      }
    );
    return res.data.access;
  } catch (error) {
    console.log("Refresh token error:", error);
    throw error;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log("Response error:", error);

    if (error.code === "ERR_NETWORK") {
      displayToastAlert(400, "Server Error, Please try later");
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem(REFRESH_TOKEN);

      if (refresh) {
        try {
          const newAccessToken = await refreshToken(refresh);
          localStorage.setItem(ACCESS_TOKEN, newAccessToken);
          api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (err) {
          console.log("Refresh token failed", err);
          localStorage.clear();
          displayToastAlert(
            400,
            "Your session has expired. Please log in again!"
          );
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
          return Promise.reject(err);
        }
      } else {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    if (error.response?.data?.error) {
      const errorMessage = error.response.data.error;
      console.log("errror messsage =========", errorMessage);

      switch (error.response.data.code) {
        case "no_account":
          displayToastAlert(400, errorMessage);
        case "authentication":
          displayToastAlert(400, errorMessage);
          break;
        case "blocked":
          displayToastAlert(400, errorMessage);
          break;
        case "authorization":
          displayToastAlert(400, errorMessage);
          break;
        default:
          displayToastAlert(error.response.status, errorMessage);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
