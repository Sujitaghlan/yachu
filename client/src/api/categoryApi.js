import axiosClient from "./axiosClient";

// Create a new category
export const createCategory = async (data) => {
  try {
    const res = await axiosClient.post("/category", {
      name: data.category,
      description: data.description,
    });

    return res.data;
    return res.data;
  } catch (err) {
    console.error("Create Category API Error:", err);

    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

// Fetch all categories
export const getCategories = async () => {
  try {
    const res = await axiosClient.get("/category");
    return res.data;
  } catch (err) {
    console.error("Get Categories Error:", err);
    throw err;
  }
};

// Update category
export const updateCategory = async (id, data) => {
  try {
    const res = await axiosClient.put(`/category/${id}`, {
      name: data.category,
      description: data.description,
    });

    return res.data;
    return res.data;
  } catch (err) {
    console.error("Update Category API Error:", err);

    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

// Delete category
export const deleteCategory = async (id) => {
  try {
    const res = await axiosClient.delete(`/category/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete Category API Error:", err);
    throw new Error("Failed to delete category");
  }
};
