import axios from "axios";

// Create axios instance
const axiosClient = axios.create({
  baseURL: "https://yachu.onrender.com/api", 
  withCredentials: true,
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !config.url?.includes("/auth/refresh")) {
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
        // Call refresh endpoint (using relative path with axiosClient)
        const response = await axiosClient.post(
          "/auth/refresh",
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
