import React from "react";
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa";

export default function AddYourComment() {
  return (
    <div>
      {/* Textarea */}
      <textarea
        rows="3"
        placeholder="Add your comments..."
        className="w-full mt-1 p-3 rounded-xl border bg-secondary/40 text-black outline-none font-paragraph"
      ></textarea>

      {/* BIU Icons + Submit Button */}
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-5 text-xl text-primary">
          <FaBold />
          <FaItalic />
          <FaUnderline />
        </div>

        <button className="px-6 py-2 bg-primary text-white rounded-xl text-h3 shadow hover:bg-[#002244] transition font-paragraph">
          Submit Review
        </button>
      </div>
    </div>
  );
}
