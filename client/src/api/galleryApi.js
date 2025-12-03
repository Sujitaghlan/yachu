/* eslint-disable no-unused-vars */
import axios from "axios";

const BASE_URL = "/api/gallery";

export const getGalleryList = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch gallery list");
  }
};

export const getGalleryById = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    throw new Error("Failed to fetch gallery item");
  }
};

export const createGallery = async ({ image, description }) => {
  if (!image) throw new Error("Image is required");

  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", description);

  try {
    const res = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    const errorText =
      err.response?.data ||
      err.message ||
      "Failed to create gallery item";
    throw new Error(errorText);
  }
};

export const updateGallery = async (id, { image, description }) => {
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("description", description);

  try {
    const res = await axios.put(`${BASE_URL}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err) {
    const errorText =
      err.response?.data ||
      err.message ||
      "Failed to update gallery item";
    throw new Error(errorText);
  }
};

export const deleteGallery = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  } catch (err) {
    throw new Error("Failed to delete gallery item");
  }
};
