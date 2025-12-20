import React, { useState, useEffect, useRef } from "react";
import {
  FaShoppingCart,
  FaBars,
  FaUserCircle,
  FaUserAlt,
  FaSearch,
  FaClipboardList,
} from "react-icons/fa";
import logo from "../assets/logo.png";
import NavLinks from "../utils/NavLinks";
import { useCart } from "../context/CartContext";
import Cart from "./Cart";
import SearchBar from "../utils/SearchBar";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ onSearch }) {
  const [open, setOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const links = [
    { id: 1, title: "Home", path: "/" },
    { id: 3, title: "About", path: "/about" },
    { id: 5, title: "Ingredients", path: "/ingredients" },
    { id: 6, title: "Gallery", path: "/gallery" },
    { id: 7, title: "Results", path: "/results" },
  ];

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedImage = localStorage.getItem("profileImage");
    if (storedUser) setUser(storedUser);
    if (storedImage) setProfileImage(storedImage);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileImage");
    setUser(null);
    setProfileImage(null);
    setDropdownOpen(false);

    // Dispatch custom event to notify CartContext of logout
    window.dispatchEvent(new Event("userLogout"));

    navigate("/");
  };

  const handleLoginRedirect = () => {
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-primary to-[#0058A1] shadow-md fixed z-50">
      {/* Main Navbar Container */}
      <div className="w-full px-4 py-3 md:px-8 lg:px-16 xl:px-20">
        <div className="flex items-center justify-between gap-4">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center gap-4 md:gap-6 lg:gap-12">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#FFD700] object-cover"
              />
            </Link>

            <div className="hidden lg:flex">
              <NavLinks links={links} />
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="block md:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                  className="w-full py-2 pl-3 pr-10 rounded-full shadow-lg text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <FaSearch className="absolute right-3 top-2.5 text-gray-500 text-lg" />
              </div>
            </div>
            <div className="hidden md:block">
              <SearchBar placeholder="Search Product..." onSearch={onSearch} />
            </div>
          </div>

          {/* Right Section - Cart, Profile, Menu */}
          <div className="flex items-center gap-3 md:gap-8 lg:gap-10">
            {/* Cart Icon */}
            <div className="relative">
              <FaShoppingCart
                className="text-white text-2xl md:text-3xl cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setShowCart(true)}
              />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-9 h-9 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white/20 cursor-pointer hover:border-white/40 transition-all duration-300"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {user ? (
                  profileImage ? (
                    <img
                      src={profileImage}
                      alt="User"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserCircle className="w-full h-full text-white" />
                  )
                ) : (
                  <FaUserAlt className="w-full h-full text-white" />
                )}
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-3 min-w-[16rem] max-w-xs bg-white shadow-xl rounded-xl overflow-hidden z-50 animate-fade-in-down border border-gray-100">
                  {user ? (
                    <div className="p-4 border-b border-gray-100 flex flex-col items-start bg-gray-50">
                      <div className="flex items-center gap-3">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <FaUserCircle className="w-10 h-10 text-gray-600" />
                        )}
                        <div className="flex flex-col">
                          <span className="text-gray-800 font-semibold text-sm break-all">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/* Actions */}
                  <div className="flex flex-col p-2">
                    {user ? (
                      <>
                        <button
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                          onClick={() => navigate("/order-history")}
                        >
                          <FaClipboardList className="text-gray-500" />
                          Order History
                        </button>
                        <button
                          className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                          onClick={handleLogout}
                        >
                          <FaUserCircle className="text-gray-500" />
                          Logout
                        </button>
                      </>
                    ) : (
                      <button
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                        onClick={handleLoginRedirect}
                      >
                        <FaUserAlt className="text-gray-500" />
                        Login
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <FaBars
                className="text-white text-2xl cursor-pointer hover:scale-110 transition-transform"
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-primary/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-4 py-3">
            <NavLinks
              links={links}
              mobile={true}
              onClick={() => setOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Cart Panel */}
      {showCart && <Cart onClose={() => setShowCart(false)} />}
    </nav>
  );
}

export default NavBar;
