// frontend/src/api.js
import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./constants";

// Use env variable with fallback
const API_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


// Attach access token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);


// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {

    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {

      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(REFRESH_TOKEN);

      if (!refreshToken) {
        logoutUser();
        return Promise.reject(error);
      }

      try {

        // Use API_URL instead of hardcoded localhost
        const res = await axios.post(
          `${API_URL}/token/refresh/`,
          {
            refresh: refreshToken,
          }
        );

        const newAccess = res.data.access;

        localStorage.setItem(ACCESS_TOKEN, newAccess);

        // Attach new token and retry request
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(originalRequest);

      } catch (err) {

        logoutUser();
        return Promise.reject(err);

      }
    }

    return Promise.reject(error);
  }
);


// Logout function
function logoutUser() {

  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);

  window.location.href = "/login";

}

export default api;