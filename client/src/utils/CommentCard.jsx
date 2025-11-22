import React from "react";

export default function CommentCard() {
  return (
    <div className="w-[48%] bg-white shadow-md rounded-2xl p-4 flex gap-3">
      <img
        src="https://i.pravatar.cc/100"
        alt="user"
        className="w-12 h-12 rounded-full object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-h3 font-headline text-black">
          Parma Lama
        </h3>
        <p className="text-[10px] text-black leading-tight">4 minutes ago</p>

        <p className="text-[12px] mt-1 text-black leading-snug">
          After using Yachu Hair oil, thickness of my hair has increased
          significantly. Best oil for your hair regrowth.
        </p>
      </div>
    </div>
  );
}
