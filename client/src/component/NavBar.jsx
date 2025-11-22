import React, { useState } from "react";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import logo from "../assets/logo.png";
import NavLinks from "../utils/NavLinks";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";
import SearchBar from "../utils/SearchBar";

function NavBar() {
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { totalItems } = useCart();

  const links = [
    { id: 1, title: "Home", path: "/" },
    { id: 3, title: "About", path: "/about" },
    { id: 4, title: "Contact", path: "/contact" },
    { id: 5, title: "Ingredients", path: "/ingredients" },
    { id: 6, title: "Gallery", path: "/gallery" },
  ];

  return (
    <nav className="w-full bg-gradient-to-r from-[#003F73] to-[#0058A1] px-3 py-3 shadow-md fixed z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-6">
          <img
            src={logo}
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-yellow-400 object-cover"
          />

          <div className="hidden lg:flex">
            <NavLinks links={links} />
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Search Bar */}
          <SearchBar placeholder="Search Product..." />

          {/* Cart Icon */}
          <div className="relative">
            <FaShoppingCart
              className="text-white text-2xl sm:text-3xl cursor-pointer"
              onClick={() => setShowCart(true)}
            />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

          {/* Profile */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-yellow-400 overflow-hidden">
            <img src={logo} alt="User" className="w-full h-full object-cover" />
          </div>

          {/* Hamburger */}
          <FaBars
            className="text-white text-3xl cursor-pointer lg:hidden"
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden mt-3 bg-[#003F73] rounded-lg p-4">
          <NavLinks links={links} mobile={true} onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Cart Panel */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </nav>
  );
}

export default NavBar;
