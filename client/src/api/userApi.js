import axiosClient from "./axiosClient";

const API = axiosClient.create({
  baseURL: "/api/auth", 
});

export const registerUser = async (userData) => {
  try {
    const res = await API.post("/register", userData);
    return res.data; 
  } catch (error) {
    console.error("Register error:", error);
    throw error.response?.data || error;
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await API.post("/login", userData);
    return res.data; 
  } catch (error) {
    console.error("Login error:", error);
    throw error.response?.data || error;
  }
};

export const googleLogin = async (idToken) => {
  try {
    const res = await API.post("/google-login", { idToken }, { withCredentials: true }); 
    return res.data;
  } catch (error) {
    console.error("Google login error:", error);
    throw error.response?.data || error;
  }
};

export const sendOTP = async (data) => {
  const res = await API.post("/forgot-password", data);
  return res.data;
};

export const verifyOTP = async (data) => {
  const res = await API.post("/verify-otp", data);
  return res.data;
};

export const resetPassword = async (data) => {
  const res = await API.post("/reset-password", data);
  return res.data;
};

