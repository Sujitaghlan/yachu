import axios from "axios";

// Add token to headers
const tokenHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
});

// Add item to cart
export const addToCartApi = (productId, quantity) => {
  return axios.post("/api/cart", { productId, quantity }, tokenHeader());
};

// Get cart by user
export const getCartApi = (userId) => {
  return axios.get(`/api/cart/${userId}`, tokenHeader());
};

// Update cart quantity
export const updateCartQuantityApi = (productId, quantity) => {
  return axios.put(`/api/cart/${productId}`, { quantity }, tokenHeader());
};

// Remove from cart
export const removeFromCartApi = (productId) => {
  return axios.delete(`/api/cart/${productId}`, tokenHeader());
};
