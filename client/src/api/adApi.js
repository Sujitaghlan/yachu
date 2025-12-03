import axios from "axios";

// Create ad
export const createAd = async (data, token) => {
  try {
    const res = await axios.post("/api/ads", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Create Ad Error:", err);
    throw err;
  }
};

// Update ad
export const updateAd = async (id, data, token) => {
  try {
    const res = await axios.put(`/api/ads/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Update Ad Error:", err);
    throw err;
  }
};

// Get ad by ID
export const getAdById = async (id) => {
  try {
    const res = await axios.get(`/api/ads/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Ad Error:", err);
    throw err;
  }
};

// Get all ads
export const getAllAds = async () => {
  try {
    const res = await axios.get("/api/ads");
    return res.data;
  } catch (err) {
    console.error("Get All Ads Error:", err);
    throw err;
  }
};

// Delete ad
export const deleteAd = async (id, token) => {
  try {
    const res = await axios.delete(`/api/ads/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Delete Ad Error:", err);
    throw err;
  }
};
