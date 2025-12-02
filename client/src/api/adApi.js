// adApi.js

// Create ad
export const createAd = async (data, token) => {
  try {
    const res = await fetch("/api/ads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Create Ad Error:", err);
    throw err;
  }
};

// Update ad
export const updateAd = async (id, data, token) => {
  try {
    const res = await fetch(`/api/ads/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  } catch (err) {
    console.error("Update Ad Error:", err);
    throw err;
  }
};

// Get ad by ID
export const getAdById = async (id) => {
  try {
    const res = await fetch(`/api/ads/${id}`);
    return await res.json();
  } catch (err) {
    console.error("Get Ad Error:", err);
    throw err;
  }
};

// Get all ads
export const getAllAds = async () => {
  try {
    const res = await fetch("/api/ads");
    return await res.json();
  } catch (err) {
    console.error("Get All Ads Error:", err);
    throw err;
  }
};

// Delete ad
export const deleteAd = async (id, token) => {
  try {
    const res = await fetch(`/api/ads/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await res.json();
  } catch (err) {
    console.error("Delete Ad Error:", err);
    throw err;
  }
};
