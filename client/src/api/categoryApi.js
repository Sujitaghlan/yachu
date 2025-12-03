import axios from "axios";

// Create a new category
export const createCategory = async (data) => {
  try {
    const res = await axios.post(
      "/api/category",
      {
        name: data.category,
        description: data.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
    const res = await axios.get("/api/category");

    return res.data;
  } catch (err) {
    console.error("Get Category API Error:", err);
    throw new Error("Failed to fetch categories");
  }
};

// UPDATE CATEGORY
export const updateCategory = async (id, data) => {
  try {
    const res = await axios.put(
      `/api/category/${id}`,
      {
        name: data.category,
        description: data.description,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Update Category API Error:", err);

    if (err.response?.data?.message) {
      throw new Error(err.response.data.message);
    }

    throw err;
  }
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  try {
    const res = await axios.delete(`/api/category/${id}`);

    return res.data;
  } catch (err) {
    console.error("Delete Category API Error:", err);
    throw new Error("Failed to delete category");
  }
};
