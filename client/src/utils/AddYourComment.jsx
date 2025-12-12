import React, { useState, useRef } from "react";
import { FaBold, FaItalic, FaUnderline, FaPaperPlane } from "react-icons/fa";
import { createReview } from "../api/reviewApi";
import { useNavigate } from "react-router-dom";

export default function AddYourComment({ onNewReview }) {
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const textareaRef = useRef(null); // ref to control textarea

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      alert("Please login to submit a review");
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (!description.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      setLoading(true);
      const res = await createReview(description, token);
      setDescription("");
      if (onNewReview) onNewReview(res.review);
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Failed to submit review", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        alert("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      alert(
        error.response?.data?.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
      // Remove focus immediately to prevent re-triggering
      if (textareaRef.current) textareaRef.current.blur();

      const shouldLogin = window.confirm(
        "You need to login to submit a review. Login now?"
      );

      if (shouldLogin) {
        navigate("/login", { state: { from: window.location.pathname } });
      }
      // If Cancel, just return to UI. Next focus will show confirm again.
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-xl font-bold font-headline text-primary mb-2">
          Add Your Comment
        </h3>
        <p className="text-tertiary font-paragraph text-base">
          Share your thoughts with our community
        </p>
      </div>

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows="4"
        placeholder="Write your comment here..."
        className="w-full p-4 md:p-5 rounded-xl border-2 border-gray-200 bg-white text-black outline-none font-paragraph text-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onFocus={handleFocus}
      ></textarea>
      {/* Formatting tools and submit button */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
        {/* Formatting tools */}
        <div className="flex items-center gap-6 text-2xl text-primary/70">
          <button
            type="button"
            className="hover:text-primary transition-colors hover:scale-110"
            title="Bold"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("Please login to use formatting tools");
                navigate("/login");
                return;
              }
              // Add bold formatting logic here
            }}
          >
            <FaBold />
          </button>
          <button
            type="button"
            className="hover:text-primary transition-colors hover:scale-110"
            title="Italic"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("Please login to use formatting tools");
                navigate("/login");
                return;
              }
              // Add italic formatting logic here
            }}
          >
            <FaItalic />
          </button>
          <button
            type="button"
            className="hover:text-primary transition-colors hover:scale-110"
            title="Underline"
            onClick={() => {
              const token = localStorage.getItem("token");
              if (!token) {
                alert("Please login to use formatting tools");
                navigate("/login");
                return;
              }
              // Add underline formatting logic here
            }}
          >
            <FaUnderline />
          </button>
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          disabled={loading || !description.trim()}
          className="px-8 py-3 bg-primary text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-[#002244] hover:shadow-xl transition-all duration-300 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-paragraph"
        >
          {loading ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Submitting...
            </>
          ) : (
            <>
              <FaPaperPlane />
              Submit Review
            </>
          )}
        </button>
      </div>
    </div>
  );
}
