import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function CommentCard({ text, username, avatar, timestamp }) {
  return (
    <div className="w-full md:w-[48%] bg-white shadow-lg rounded-2xl p-5 md:p-6 flex gap-4 hover:shadow-xl transition-shadow duration-300">
      {/* Avatar */}
      <div className="flex-shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={username || "user"}
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/20"
          />
        ) : (
          <FaUserCircle className="w-14 h-14 md:w-16 md:h-16 text-primary/60" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* User info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
          <h3 className="font-bold text-lg md:text-xl font-headline text-primary">
            {username || "Anonymous"}
          </h3>
          <p className="text-sm text-tertiary">
            {timestamp ? new Date(timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }) : "Just now"}
          </p>
        </div>

        {/* Comment text */}
        <p className="text-base md:text-lg text-black leading-relaxed font-paragraph">
          {text}
        </p>
      </div>
    </div>
  );
}