import axiosClient from "./axiosClient";

// Fetch all products
export const getAllProducts = async () => {
  try {
    const res = await axiosClient.get("/api/products");
    return res.data;
  } catch (err) {
    console.error("Get Products Error:", err);
    throw err;
  }
};

// Fetch one product
export const getProductById = async (id) => {
  try {
    const res = await axiosClient.get(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Product Error:", err);
    throw err;
  }
};

// Create product
export const createProduct = async (data) => {
  try {
    const formData = new FormData();
    formData.append("productName", data.productName || "");
    formData.append("price", data.price || 0);
    formData.append("stock", data.stock || 0);
    formData.append("category", data.category || "");
    formData.append("netContent", data.netContent || "");
    formData.append("description", data.description || "");
    if (data.image) formData.append("image", data.image);

    const token = localStorage.getItem("token");

    const res = await axiosClient.post("/api/products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
    return res.data;
  } catch (err) {
    console.error("Create Product Error:", err);
    throw err;
  }
};

// Update product
export const updateProduct = async (id, data) => {
  try {
    const formData = new FormData();
    formData.append("productName", data.productName || "");
    formData.append("price", data.price || 0);
    formData.append("stock", data.stock || 0);
    formData.append("category", data.category || "");
    formData.append("netContent", data.netContent || "");
    formData.append("description", data.description || "");
    if (data.image) formData.append("image", data.image);

    const token = localStorage.getItem("token");

    const res = await axiosClient.put(`/api/products/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
    return res.data;
  } catch (err) {
    console.error("Update Product Error:", err);
    throw err;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axiosClient.delete(`/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (err) {
    console.error("Delete Product Error:", err);
    throw err;
  }
};
