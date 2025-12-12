import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

function SearchBar({ placeholder = "Search Product...", onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (onSearch) onSearch(value);
     const section = document.getElementById("products");
    if (section && value.trim() !== "") {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        className="w-full py-2 md:py-3 pl-4 pr-12 rounded-full shadow-lg text-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <FaSearch className="absolute right-3 top-2 md:top-3 text-black text-lg md:text-xl" />
    </div>
  );
}

export default SearchBar;