import React, { useState } from "react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";
import { createReview } from "../api/reviewApi";
import { useNavigate } from "react-router-dom";

export default function AddYourComment({ onNewReview }) {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    if (!description.trim()) return alert("Please enter a comment");

    try {
      setLoading(true);
      const res = await createReview(description, token);
      setDescription("");
      onNewReview(res.review);
    } catch (error) {
      console.error("Failed to submit review", error);
      alert(error.response?.data?.message || "Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <textarea
        rows="3"
        placeholder="Add your comments..."
        className="w-full mt-1 p-3 rounded-xl border bg-secondary/40 text-black outline-none font-paragraph"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-5 text-xl text-primary">
          <FaBold />
          <FaItalic />
          <FaUnderline />
        </div>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-primary text-white rounded-xl text-h3 shadow hover:bg-[#002244] transition font-paragraph"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
