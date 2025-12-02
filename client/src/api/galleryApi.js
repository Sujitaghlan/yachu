const BASE_URL = "/api/gallery";

export const getGalleryList = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch gallery list");
  return res.json();
};

export const getGalleryById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch gallery item");
  return res.json();
};

export const createGallery = async ({ image, description }) => {
  if (!image) throw new Error("Image is required");

  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", description);

  const res = await fetch(BASE_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to create gallery item");
  }

  return res.json();
};

export const updateGallery = async (id, { image, description }) => {
  const formData = new FormData();
  if (image) formData.append("image", image);
  formData.append("description", description);

  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Failed to update gallery item");
  }

  return res.json();
};

export const deleteGallery = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete gallery item");
  return res.json();
};
