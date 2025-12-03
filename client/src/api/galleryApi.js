import axiosClient from "./axiosClient";

const BASE_URL = "/api/gallery";

// Get all gallery items
export const getGalleryList = async () => {
  try {
    const res = await axiosClient.get(BASE_URL);
    return res.data;
  } catch (err) {
    console.error("Get Gallery List Error:", err);
    throw err;
  }
};

// Get a single gallery item by ID
export const getGalleryById = async (id) => {
  try {
    const res = await axiosClient.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Gallery Item Error:", err);
    throw err;
  }
};

// Create a gallery item
export const createGallery = async ({ image, description }) => {
  if (!image) throw new Error("Image is required");

  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    const res = await axiosClient.post(BASE_URL, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    console.error("Create Gallery Error:", err);
    throw err;
  }
};

// Update a gallery item
export const updateGallery = async (id, { image, description }) => {
  try {
    const formData = new FormData();
    if (image) formData.append("image", image);
    formData.append("description", description);

    const res = await axiosClient.put(`${BASE_URL}/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  } catch (err) {
    console.error("Update Gallery Error:", err);
    throw err;
  }
};

// Delete a gallery item
export const deleteGallery = async (id) => {
  try {
    const res = await axiosClient.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete Gallery Error:", err);
    throw err;
  }
};
