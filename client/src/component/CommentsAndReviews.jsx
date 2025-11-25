/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import CommentCard from "../utils/CommentCard";
import AddYourComment from "../utils/AddYourComment";
import Button from "../utils/Button";

export default function CommentsAndReviews() {
  const [activeTab, setActiveTab] = useState("new");
  const [toggle, setToggle] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const commentList = [
    { id: 1, text: "This is the first comment" },
    { id: 2, text: "Here is another comment" },
    { id: 3, text: "Yet another comment appears" },
    { id: 4, text: "Fourth comment is here" },
    { id: 5, text: "Fifth comment example" },
  ];

  useEffect(() => {
    if (!toggle) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % commentList.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [toggle]);

  const getTwoComments = () => {
    const first = commentList[currentIndex];
    const second = commentList[(currentIndex + 1) % commentList.length];
    return [first, second];
  };

  const commentsToDisplay = toggle ? getTwoComments() : commentList.slice(0, 2);

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
        {commentsToDisplay.map((comment) => (
          <CommentCard key={comment.id} text={comment.text} />
        ))}
      </div>

      {/* Add Comment Form */}
      <AddYourComment />
    </div>
  );
}
