// src/utils/SearchBar.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ placeholder = "Search Product...", onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative w-[60%] sm:w-[70%] md:w-64 lg:w-80">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        className="w-full py-3 pl-4 pr-12 rounded-full shadow-lg text-black text-sm md:text-base focus:outline-none"
      />
      <FaSearch className="absolute right-3 top-3 md:top-3.5 text-black text-lg md:text-xl" />
    </div>
  );
}

export default SearchBar;
