import axiosClient from "./axiosClient";

// CREATE ORDER
export const createOrder = async (orderData) => {
  try {
    const formData = new FormData();

    for (const key in orderData) {
      if (key === "products") {
        formData.append("products", JSON.stringify(orderData.products));
      } else if (key === "paymentImage") {
        formData.append("image", orderData[key]);
      } else {
        formData.append(key, orderData[key]);
      }
    }

    const res = await axiosClient.post("/order", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    console.error("Create Order Error:", err.response?.data || err);
    throw err.response?.data || err;
  }
};

// GET ALL ORDERS (ADMIN)
export const getOrders = async () => {
  const res = await axiosClient.get("/orders");
  return res.data;
};

// GET ORDER BY ID
export const getOrderById = async (orderId) => {
  const res = await axiosClient.get(`/orders/${orderId}`);
  return res.data;
};

// GET ORDERS FOR LOGGED IN USER
export const getOrdersByUserId = async () => {
  const res = await axiosClient.get("/orders/user");
  return res.data;
};

// UPDATE ORDER STATUS
export const updateOrderStatus = async (orderId, status) => {
  const res = await axiosClient.patch(`/orders/${orderId}`, { status });
  return res.data;
};
