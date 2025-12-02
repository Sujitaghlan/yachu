// Create a new category
export const createCategory = async (data) => {
  try {
    const res = await fetch("/api/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.category,
        description: data.description,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to create category");
    }

    return await res.json(); 
  } catch (err) {
    console.error("Create Category API Error:", err);
    throw err;
  }
};

// Fetch all categories
export const getCategories = async () => {
  try {
    const res = await fetch("/api/category");

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    return await res.json();
  } catch (err) {
    console.error("Get Category API Error:", err);
    throw err;
  }
};

// UPDATE CATEGORY
export const updateCategory = async (id, data) => {
  try {
    const res = await fetch(`/api/category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.category,
        description: data.description,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to update category");
    }

    return await res.json();
  } catch (err) {
    console.error("Update Category API Error:", err);
    throw err;
  }
};

// DELETE CATEGORY
export const deleteCategory = async (id) => {
  try {
    const res = await fetch(`/api/category/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete category");
    }

    return await res.json();
  } catch (err) {
    console.error("Delete Category API Error:", err);
    throw err;
  }
};
