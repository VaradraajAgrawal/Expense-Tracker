import axios from "axios";
import { clearToken, getToken, setToken } from "./axios";
const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  timeout: 10000,
});
let sum = 0;
api.interceptors.request.use((config) => {
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhM2I3NmNjNzA1MWUyMWI2MmVkNjE5ZSIsImlhdCI6MTc4Mzk1MzQxMiwiZXhwIjoxNzgzOTU3MDEyfQ.32eEZNtO_Vw8o_5BOhOGO-5l0Uvb9m3tyqzjQo1YkiI";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    sum += 1;
    console.log(sum);
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log("Inside ResponseInt.", response);
    return response;
  },
  async (error) => {
    console.log("Inside error block of responseInterceptor");
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      try {
        console.log("refresh happening");
        originalRequest._retry = true;
        const response = await api.get("/user/refresh");
        setToken(response.data.token);
        return api(originalRequest);
      } catch (error) {
        clearToken();
        return Promise.reject(error);
      }
    } else {
      return Promise.reject(error);
    }
  },
);
export default api;
