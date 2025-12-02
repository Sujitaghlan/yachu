// Fetch all products
export const getAllProducts = async () => {
  try {
    const res = await fetch("/api/products");
    return await res.json();
  } catch (err) {
    console.error("Get Products Error:", err);
    throw err;
  }
};

// Fetch one product
export const getProductById = async (id) => {
  try {
    const res = await fetch(`/api/products/${id}`);
    return await res.json();
  } catch (err) {
    console.error("Get Product Error:", err);
    throw err;
  }
};

// Create product
export const createProduct = async (data) => {
  try {
    const formData = new FormData();

    // Append all fields explicitly to match backend
    formData.append("productName", data.productName || "");
    formData.append("price", data.price || 0);
    formData.append("stock", data.stock || 0);
    formData.append("category", data.category || "");
    formData.append("netContent", data.netContent || "");
    formData.append("description", data.description || "");
    if (data.image) formData.append("image", data.image);

    const token = localStorage.getItem("token");

    const res = await fetch("/api/products", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    return await res.json();
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

    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    return await res.json();
  } catch (err) {
    console.error("Update Product Error:", err);
    throw err;
  }
};

// Delete product
export const deleteProduct = async (id) => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const json = await res.json();

    return { ok: res.ok, data: json };
  } catch (err) {
    console.error("Delete Product Error:", err);
    throw err;
  }
};
