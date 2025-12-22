import React from "react";

const NavLinks = ({ links, mobile = false, onClick }) => {
  return (
    <ul
      className={`flex ${
        mobile
          ? "flex-col gap-1 overflow-y-auto py-2 scrollbar-hide"
          : "flex-row gap-8"
      } font-paragraph text-h2 text-[#ffffff]`}
    >
      {links.map((link) => (
        <li
          key={link.id}
          className="px-4 py-4 rounded-lg hover:text-[#FDDA00] cursor-pointer transition-all duration-300 ease-in-out"
          onClick={onClick}
        >
          <a href={link.path}>{link.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
