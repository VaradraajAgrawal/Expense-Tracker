import axios from "axios";
import { clearToken, getToken, setToken } from "./axios";
import Loader from "../Pages/Loader";
import { Navigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthContext";
let isRefreshing = false;
let failedQueue = [];
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  timeout: 10000,
});
api.interceptors.request.use((config) => {
  const token = getToken();
  console.log("Token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const processQueue = (error) => {
  if (error === null) {
    failedQueue.map((request) => {
      return request.resolve();
    });
  } else {
    failedQueue.map((request) => {
      return request.reject();
    });
  }
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.message === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, originalRequest });
        }).then(() => api(originalRequest));
      }
      try {
        isRefreshing = true;
        let response = api.get("/user/refresh");
        setToken(response.token);
        processQueue(null);
        return api(originalRequest);
      } catch (error) {
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

const protectedRoute = ({ children }) => {
  const { loading, authenticated } = useAuth();

  if (loading) return <Loader />;
  if (authenticated) return request;
  return <Navigate to="/login" replace />;
};

export default api;
