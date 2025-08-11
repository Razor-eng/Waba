import axios, { AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to include Bearer token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Adjust based on your auth storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
