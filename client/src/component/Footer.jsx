import React from "react";
import logo from "../assets/logo.png";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="text-white w-full" style={{ backgroundColor: "#003366" }}>
      <div className="w-full px-6 lg:px-20 mx-auto py-12">

        {/* === TOP SECTION === */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">

          {/* Brand Column */}
          <div className="flex flex-col items-start md:col-span-1">
            <img src={logo} alt="Yachu Logo" className="w-32 mb-4" />

            <p className="text-lg text-gray-200 leading-tight">
              Your Beautiful Hair <br />
              <span>with Yachu Hair Oil</span>
            </p>

            {/* Social icons row */}
            <div className="flex gap-5 mt-6 text-2xl">
              <FaFacebookF className="hover:text-yellow-400 cursor-pointer" />
              <FaTiktok className="hover:text-yellow-400 cursor-pointer" />
              <FaInstagram className="hover:text-yellow-400 cursor-pointer" />
              <FaWhatsapp className="hover:text-yellow-400 cursor-pointer" />
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Products</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white cursor-pointer">Bottle Oil</li>
              <li className="hover:text-white cursor-pointer">Sachet Oil</li>
              <li className="hover:text-white cursor-pointer">Bottle Shampoo</li>
              <li className="hover:text-white cursor-pointer">Sachet Shampoo</li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">About Yachu</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white cursor-pointer">Our Heritage</li>
              <li className="hover:text-white cursor-pointer">33 Ingredients</li>
              <li className="hover:text-white cursor-pointer">Made in Nepal</li>
              <li className="hover:text-white cursor-pointer">Customer Stories</li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Customer Care</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white cursor-pointer">Hair Consultation</li>
              <li className="hover:text-white cursor-pointer">Shipping</li>
              <li className="hover:text-white cursor-pointer">Track Orders</li>
              <li className="hover:text-white cursor-pointer">Ingredients List</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Contact Us</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-center gap-3">
                <FaPhone className="text-yellow-400" /> +977-9808731770
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-yellow-400" /> +977-01-5927179
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-400" /> uchityachu@gmail.com
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-yellow-400" /> uchityachu@gmail.com
              </li>
            </ul>
          </div>
        </div>

        {/* === BOTTOM BAR === */}
        <div className="border-t border-white/30 pt-6 flex flex-col lg:flex-row justify-between items-center text-gray-300">

          {/* Left */}
          <p className="text-base">
            © 2023 Yachu Hair Oil. All rights reserved.
          </p>

          {/* Middle */}
          <div className="flex gap-6 text-base mt-4 lg:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>

          {/* Right */}
          <span className="text-lg font-semibold text-yellow-400 mt-4 lg:mt-0">
            Made in Nepal
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
