import axiosClient from "./axiosClient";

const API = axios.create({
  baseURL: "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// CREATE ORDER 
export const createOrder = async (orderData) => {
  try {
    const formData = new FormData();

    for (const key in orderData) {
      if (key === "products") {
        formData.append("products", JSON.stringify(orderData.products));
      } else if (key === "paymentImage" && orderData[key]) {
        formData.append("image", orderData[key]);
      } else {
        formData.append(key, orderData[key]);
      }
    }

    const res = await axiosClient.post("/api/order", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    console.error("Create Order Error:", err.response?.data || err);
    throw err.response?.data || err;
  }
};

// GET ALL ORDERS
export const getOrders = async () => {
  try {
    const res = await API.get("/orders");
    return res.data;
  } catch (err) {
    console.error("Get Orders Error:", err.response?.data || err);
    throw err.response?.data || err;
  }
};

// GET ORDER BY ID
export const getOrderById = async (orderId) => {
  try {
    const res = await API.get(`/orders/${orderId}`);
    return res.data;
  } catch (err) {
    console.error("Get Order By ID Error:", err.response?.data || err);
    throw err.response?.data || err;
  }
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (orderId, status) => {
  try {
    const res = await API.patch(`/orders/${orderId}`, { status });
    return res.data;
  } catch (err) {
    console.error("Update Order Status Error:", err.response?.data || err);
    throw err.response?.data || err;
  }
};
