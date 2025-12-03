import axiosClient from "./axiosClient";

// Create a new category
export const createCategory = async (data) => {
  try {
    const res = await axiosClient.post("/api/category", {
      name: data.category,
      description: data.description,
    });

    return res.data;
  } catch (err) {
    console.error("Create Category API Error:", err);
    throw err;
  }
};

// Fetch all categories
export const getCategories = async () => {
  try {
    const res = await axiosClient.get("/api/category");
    return res.data;
  } catch (err) {
    console.error("Get Categories Error:", err);
    throw err;
  }
};

// Update category
export const updateCategory = async (id, data) => {
  try {
    const res = await axiosClient.put(`/api/category/${id}`, {
      name: data.category,
      description: data.description,
    });

    return res.data;
  } catch (err) {
    console.error("Update Category API Error:", err);
    throw err;
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const res = await axiosClient.delete(`/api/category/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete Category API Error:", err);
    throw err;
  }
};
