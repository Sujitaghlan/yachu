import axiosClient from "./axiosClient";

// Add item to cart
export const addToCartApi = (productId, quantity) => {
  return axiosClient.post("/api/cart", { productId, quantity });
};

// Get cart by user
export const getCartApi = (userId) => {
  return axiosClient.get(`/api/cart/${userId}`);
};

// Update cart quantity
export const updateCartQuantityApi = (productId, quantity) => {
  return axiosClient.put(`/api/cart/${productId}`, { quantity });
};

// Remove from cart
export const removeFromCartApi = (cartItemId) => {
  return axiosClient.delete(`/api/cart/${cartItemId}`);
};
