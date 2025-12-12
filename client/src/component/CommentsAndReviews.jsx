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
    // FIX: Only show one comment if list has only 1 item
    if (commentList.length === 1) {
      return [commentList[0]];
    }

    const first = commentList[currentIndex];
    const second = commentList[(currentIndex + 1) % commentList.length];
    return [first, second];
  };

  const commentsToDisplay = toggle ? getTwoComments() : commentList.slice(-2);

  const handleNewReview = async (newReview) => {
    await loadReviews();
  };

  return (
    <div className="w-full py-8 bg-white">
      {/* Outer container with same padding as NavBar */}
      <div className="w-full md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        {/* Inner container with rounded corners and shadow */}
        <div className="w-full bg-white rounded-3xl shadow-sm md:p-8">
          {/* Tabs */}
          <div className="flex items-center justify-between gap-2 mb-6 md:mb-8">
            <div className="flex items-center gap-3 font-paragraph">
              <Button
                onClick={() => setActiveTab("new")}
                background={activeTab === "new" ? "#ffffff" : "transparent"}
                hoverBackground="#ffffff"
                textColor={activeTab === "new" ? "#013067" : "#6B7280"}
                padding="8px 20px"
                borderRadius="9999px"
                borderColor="#d1d5db"
                borderWidth="1px"
                className="text-sm whitespace-nowrap"
              >
                New Comments
              </Button>

              <Button
                onClick={() => setActiveTab("top")}
                background={activeTab === "top" ? "#ffffff" : "transparent"}
                hoverBackground="#ffffff"
                textColor={activeTab === "top" ? "#013067" : "#6B7280"}
                padding="8px 20px"
                borderRadius="9999px"
                borderColor="#d1d5db"
                borderWidth="1px"
                className="text-sm whitespace-nowrap"
              >
                Top Comments
              </Button>
            </div>

            {/* Toggle Switch */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-paragraph hidden sm:block">
                Auto Scroll
              </span>
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  className="opacity-0 w-0 h-0 peer"
                  checked={toggle}
                  onChange={() => setToggle(!toggle)}
                />
                <span className="absolute inset-0 bg-secondary rounded-full peer-checked:bg-primary transition"></span>
                <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition peer-checked:translate-x-6"></span>
              </label>
            </div>
          </div>

          {/* Comments */}
          <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6 mb-8 min-h-[150px]">
            {commentsToDisplay.length > 0 ? (
              commentsToDisplay.map((comment, index) => (
                // FIX: Use compound key to prevent duplicate rendering
                <div
                  key={`${comment._id || comment.id}-${index}`}
                  className="flex-1"
                >
                  <CommentCard
                    text={comment.description || comment.text}
                    username={comment.user?.name || "Anonymous"}
                    avatar={comment.user?.profileImage}
                    timestamp={comment.createdAt}
                  />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-10">
                <p className="text-gray-500 italic text-lg">
                  No comments found
                </p>
              </div>
            )}
          </div>

          {/* Add Comment Form */}
          <div className="mt-8">
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
        </div>
      </div>
    </div>
  );
}
