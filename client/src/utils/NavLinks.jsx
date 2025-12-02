import React from "react";

const NavLinks = ({ links, mobile = false, onClick }) => {
  return (
    <ul
      className={`${
        mobile 
          ? "flex flex-row space-x-4 overflow-x-auto py-2 scrollbar-hide" 
          : "flex space-x-8"
      } font-paragraph text-h2 text-[#ffffff]`}
    >
      {links.map((link) => (
        <li
          key={link.id}
          className={`${
            mobile 
              ? "whitespace-nowrap px-3 py-2 flex-shrink-0" 
              : "px-4 py-2"
          } rounded-lg hover:text-[#FDDA00] cursor-pointer transition-all duration-300 ease-in-out`}
          onClick={onClick}
        >
          <a href={link.path}>{link.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;