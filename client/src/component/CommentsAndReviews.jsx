import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CommentCard from "../utils/CommentCard";
import AddYourComment from "../utils/AddYourComment";
import Button from "../utils/Button";
import { getReviews } from "../api/reviewApi";

export default function CommentsAndReviews() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("new");
  const [toggle, setToggle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const data = await getReviews();
      setCommentList(data || []);
    } catch (error) {
      console.error("Failed to load reviews", error);
      setCommentList([]);
    }
  };

  useEffect(() => {
    if (!toggle || commentList.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % commentList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [toggle, commentList]);

  const getTwoComments = () => {
    const first = commentList[currentIndex];
    const second = commentList[(currentIndex + 1) % commentList.length];
    return [first, second];
  };

  const commentsToDisplay = toggle ? getTwoComments() : commentList.slice(0, 2);

  const handleNewReview = (newReview) => {
    setCommentList((prev) => [newReview, ...prev]);
  };

  return (
    <div className="w-full px-6 md:px-32 lg:px-40 xl:px-48 2xl:px-64 py-6 bg-white rounded-3xl shadow-sm">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3 font-paragraph">
          <Button
            onClick={() => setActiveTab("new")}
            background={activeTab === "new" ? "#ffffff" : "transparent"}
            hoverBackground="#ffffff"
            textColor={activeTab === "new" ? "#013067" : "#6B7280"}
            padding="6px 16px"
            borderRadius="9999px"
            borderColor="#d1d5db"
            borderWidth="1px"
            className="text-[12px] whitespace-nowrap"
          >
            New Comments
          </Button>

          <Button
            onClick={() => setActiveTab("top")}
            background={activeTab === "top" ? "#ffffff" : "transparent"}
            hoverBackground="#ffffff"
            textColor={activeTab === "top" ? "#013067" : "#6B7280"}
            padding="6px 16px"
            borderRadius="9999px"
            borderColor="#d1d5db"
            borderWidth="1px"
            className="text-[12px] whitespace-nowrap"
          >
            Top Comments
          </Button>
        </div>

        {/* Toggle Switch */}
        <label className="relative inline-block w-11 h-5">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0 peer"
            checked={toggle}
            onChange={() => setToggle(!toggle)}
          />
          <span className="absolute inset-0 bg-secondary rounded-full peer-checked:bg-primary transition"></span>
          <span className="absolute left-1 top-1 w-3.5 h-3.5 bg-white rounded-full transition peer-checked:translate-x-6"></span>
        </label>
      </div>

      {/* Comments */}
      <div className="flex justify-between gap-3 mb-6 min-h-[150px]">
        {commentsToDisplay.length > 0 ? (
          commentsToDisplay.map((comment) => (
            <CommentCard
              key={comment._id || comment.id}
              text={comment.description || comment.text}
              username={comment.user?.name || "Anonymous"}
              avatar={comment.user?.profileImage}
              timestamp={comment.createdAt}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No comments found</p>
        )}
      </div>

      {/* Add Comment Form */}
      <AddYourComment
        onNewReview={(review) => {
          const token = localStorage.getItem("token");
          if (!token) {
            navigate("/login");
            return;
          }
          handleNewReview(review);
        }}
      />
    </div>
  );
}
