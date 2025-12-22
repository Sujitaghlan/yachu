import axiosClient from "./axiosClient";

const API = "/videos";

const getToken = () => localStorage.getItem("token");

export const createVideo = async (videoData) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const res = await axiosClient.post(API, videoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getVideos = async () => {
  const res = await axiosClient.get(API);
  return res.data;
};

export const getVideoById = async (id) => {
  try {
    const res = await axiosClient.get(`${API}/${id}`);
    return res.data;
  } catch (err) {
    console.error("Get Video Error:", err);
    throw err;
  }
};

export const updateVideo = async (id, videoData) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");
  const res = await axiosClient.put(`${API}/${id}`, videoData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteVideo = async (id) => {
  const token = getToken();
  if (!token) throw new Error("No auth token found");

  const res = await axiosClient.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
