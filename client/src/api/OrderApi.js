import axiosClient from "./axiosClient";

export const createOrder = async (orderData) => {
  try {
    const token = localStorage.getItem("token");
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
    console.error("Order API Error:", err.response?.data || err);
    throw err.response?.data || err;
  }
};
