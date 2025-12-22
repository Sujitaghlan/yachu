import axiosClient from "./axiosClient";

export const registerUser = async (userData) => {
  try {
    const res = await axiosClient.post("/auth/register", userData);
    return res.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error.response?.data || error;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await axiosClient.post("/auth/login", userData);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data || error;
  }
};

export const googleLogin = async (idToken) => {
  try {
    const res = await axiosClient.post(
      "/auth/google-login",
      { idToken },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Google login error:", error);
    throw error.response?.data || error;
  }
};

export const sendOTP = async (data) => {
  const res = await axiosClient.post("/auth/forgot-password", data);
  return res.data;
};

export const verifyOTP = async (data) => {
  const res = await axiosClient.post("/auth/verify-otp", data);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await axiosClient.post("/auth/reset-password", data);
  return res.data;
};
