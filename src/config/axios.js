// Set config defaults when creating the instance
import axios from "axios";

const api = axios.create({
  baseURL: "https://678b95c11a6b89b27a2acf18.mockapi.io/Orchid",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Interceptor để xử lý lỗi
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
