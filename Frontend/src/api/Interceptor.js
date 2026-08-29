import axios from "axios";

import { clearToken, getToken, setToken } from "./axios";

let isRefreshing = false;
let failedQueue = [];

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  timeout: 10000,
});

// --------------------------------------------------
// Request Interceptor
// --------------------------------------------------

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    console.log("Token:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// --------------------------------------------------
// Process requests waiting for token refresh
// --------------------------------------------------

// as null will we passed that would make the else block run //
const processQueue = (error) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error);
    } else {
      request.resolve();
    }
  });

  failedQueue = [];
};

// --------------------------------------------------
// Response Interceptor
// --------------------------------------------------

api.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // If there is no response, this is probably
    // a network/timeout/cancellation error.
    if (!error.response) {
      return Promise.reject(error);
    }

    // Never try to refresh the refresh request itself.
    if (originalRequest?.url === "/user/refresh") {
      return Promise.reject(error);
    }

    const isTokenExpired =
      error.response.status === 401 &&
      error.response.data?.message === "TOKEN_EXPIRED";

    if (!isTokenExpired || originalRequest?._retry) {
      return Promise.reject(error);
    }

    // --------------------------------------------------
    // Another request is already refreshing the token
    // --------------------------------------------------

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve,
          reject,
        });
      }).then(() => {
        return api(originalRequest);
      });
    }

    // --------------------------------------------------
    // This request becomes responsible for refreshing
    // --------------------------------------------------

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await api.post("/user/refresh");

      const newAccessToken = response.data.accessToken;

      setToken(newAccessToken);

      processQueue(null);

      return api(originalRequest);
    } catch (refreshError) {
      clearToken();

      processQueue(refreshError);

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
