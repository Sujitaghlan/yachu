import axios from "axios";

// Create axios instance
const axiosClient = axios.create({
  baseURL: "http://localhost:3000", // optional: set base URL
  withCredentials: true, // send cookies for refresh token
});

// REQUEST INTERCEPTOR: attach access token
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE INTERCEPTOR: handle 401 and refresh token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only try refresh if 401 and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
        const response = await axios.post(
          "http://localhost:3000/api/auth/refresh", // relative path works because of baseURL
          {},
          { withCredentials: true }
        );

        console.log("Token refreshed", response.data);

        // Get new access token and store it
        const newToken = response.data.accessToken;
        localStorage.setItem("token", newToken);

        // Update the original request's Authorization header
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry the original request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed: logout user
        localStorage.clear();
        window.location.href = "/";
      }
    }

    // Other errors
    return Promise.reject(error);
  }
);

export default axiosClient;
