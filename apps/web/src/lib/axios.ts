import axios from "axios";

// Create an Axios instance with default config
const apiClient = axios.create({
  baseURL: process.env.API_URL || "http://localhost:4000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle error globally
    console.error("API request failed with error:", error);
    return Promise.reject(error);
  },
);

export default apiClient;
