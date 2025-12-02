import axios from "axios";

const API = "/api/review";

// GET all reviews
export const getReviews = async () => {
  const res = await axios.get(API);
  return res.data;
};

// CREATE review (requires token)
export const createReview = async (description, token) => {
  if (!token) throw new Error("No auth token found");
  const res = await axios.post(
    API,
    { description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// UPDATE review
export const updateReview = async (id, description, token) => {
  const res = await axios.put(
    `${API}/${id}`,
    { description },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// DELETE review
export const deleteReview = async (id, token) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
