import React from "react";

const NavLinks = ({ links, mobile = false, onClick }) => {
  return (
    <ul
      className={`${
        mobile ? "flex flex-col space-y-2" : "flex space-x-6"
      } font-paragraph text-paragraph text-[#ffffff]`}
    >
      {links.map((link) => (
        <li
          key={link.id}
          className="px-4 py-2 rounded-lg hover:text-[#FDDA00] cursor-pointer transition-all duration-300 ease-in-out"
          onClick={onClick}
        >
          <a href={link.path}>{link.title}</a>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
