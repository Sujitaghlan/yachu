import axiosClient from "./axiosClient";

// Add item to cart
export const addToCartApi = (productId, quantity) => {
  return axiosClient.post("/api/cart", { productId, quantity });
};

// Get cart by user (userId no longer needed - uses authenticated user from token)
export const getCartApi = () => {
  return axiosClient.get(`/api/cart`);
};

// Update cart quantity
export const updateCartQuantityApi = (cartItemId, quantity) => {
  return axiosClient.put(`/api/cart/${cartItemId}`, { quantity });
};

// Remove from cart
export const removeFromCartApi = (cartItemId) => {
  return axiosClient.delete(`/api/cart/${cartItemId}`);
};
