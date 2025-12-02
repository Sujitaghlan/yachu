import React from "react";
import { FaUserCircle } from "react-icons/fa";

export default function CommentCard({ text, username, avatar, timestamp }) {
  return (
    <div className="w-[48%] bg-white shadow-md rounded-2xl p-4 flex gap-3">
      {avatar ? (
        <img
          src={avatar}
          alt={username || "user"}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <FaUserCircle className="w-12 h-12 text-gray-400" />
      )}

      <div className="flex-1">
        <h3 className="font-semibold text-h3 font-headline text-black">
          {username || "Anonymous"}
        </h3>
        <p className="text-[10px] text-black leading-tight">
          {timestamp ? new Date(timestamp).toLocaleString() : "Just now"}
        </p>

        <p className="text-[12px] mt-1 text-black leading-snug">{text}</p>
      </div>
    </div>
  );
}
