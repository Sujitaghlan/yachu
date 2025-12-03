import React from "react";
import logo from "../assets/logo.png";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebookF, FaTiktok, FaInstagram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
<<<<<<< HEAD
    <footer
      className="text-white w-full"
      style={{ backgroundColor: "#003366" }}
    >
      {/* Outer container with same padding as NavBar */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Section with Logo */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-3 transform -translate-y-4">
                <img
                  src={logo}
                  alt="Yachu Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="transform -translate-y-6">
                <p className="text-gray-300 italic text-lg md:text-xl">
                  Your Beautiful Hair
                  <br />
                  <span>with Yachu Hair Oil</span>
                </p>
              </div>
=======
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
>>>>>>> jivan
            </div>
          </div>

          {/* Products */}
          <div>
<<<<<<< HEAD
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#Fdda00" }}
            >
              Products
            </h3>
            <ul className="space-y-3 text-gray-300 text-base">
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Bottle Oil
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Sachet Oil
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Bottle Shampoo
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Sachet Shampoo
              </li>
=======
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Products</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white cursor-pointer">Bottle Oil</li>
              <li className="hover:text-white cursor-pointer">Sachet Oil</li>
              <li className="hover:text-white cursor-pointer">Bottle Shampoo</li>
              <li className="hover:text-white cursor-pointer">Sachet Shampoo</li>
>>>>>>> jivan
            </ul>
          </div>

          {/* About */}
          <div>
<<<<<<< HEAD
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#Fdda00" }}
            >
              About Yachu
            </h3>
            <ul className="space-y-3 text-gray-300 text-base">
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Our Heritage
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                33 Ingredients
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Made in Nepal
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Customer Stories
              </li>
=======
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">About Yachu</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white cursor-pointer">Our Heritage</li>
              <li className="hover:text-white cursor-pointer">33 Ingredients</li>
              <li className="hover:text-white cursor-pointer">Made in Nepal</li>
              <li className="hover:text-white cursor-pointer">Customer Stories</li>
>>>>>>> jivan
            </ul>
          </div>

          {/* Customer Care */}
          <div>
<<<<<<< HEAD
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#Fdda00" }}
            >
              Customer Care
            </h3>
            <ul className="space-y-3 text-gray-300 text-base">
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Hair Consultation
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Shipping
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Track Orders
              </li>
              <li className="hover:text-white cursor-pointer transition-colors duration-200">
                Ingredients List
              </li>
=======
            <h3 className="text-xl font-semibold mb-4 text-yellow-400">Customer Care</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-white cursor-pointer">Hair Consultation</li>
              <li className="hover:text-white cursor-pointer">Shipping</li>
              <li className="hover:text-white cursor-pointer">Track Orders</li>
              <li className="hover:text-white cursor-pointer">Ingredients List</li>
>>>>>>> jivan
            </ul>
          </div>

          {/* Contact */}
          <div>
<<<<<<< HEAD
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#Fdda00" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-4 text-gray-300 text-base">
              <li className="flex items-center hover:text-white transition-colors duration-200">
                <FaPhone className="mr-3 text-lg" style={{ color: "#Fdda00" }} />
                <span>+977-9808731770</span>
              </li>
              <li className="flex items-center hover:text-white transition-colors duration-200">
                <FaPhone className="mr-3 text-lg" style={{ color: "#Fdda00" }} />
                <span>+977-01-5927179</span>
              </li>
              <li className="flex items-center hover:text-white transition-colors duration-200">
                <FaEnvelope className="mr-3 text-lg" style={{ color: "#Fdda00" }} />
                <span>uchityachu@gmail.com</span>
              </li>
              <li className="flex items-center hover:text-white transition-colors duration-200">
                <FaMapMarkerAlt className="mr-3 text-lg" style={{ color: "#Fdda00" }} />
                <span>Bijulibazar, Kathmandu, Nepal</span>
=======
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
>>>>>>> jivan
              </li>
            </ul>
          </div>
        </div>

<<<<<<< HEAD
        {/* Bottom Section with White Border */}
        <div className="border-t border-white/30 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
            {/* Copyright */}
            <div className="text-gray-300 text-base text-center lg:text-left">
              <p>© 2023 Yachu Hair Oil. All rights reserved.</p>
            </div>

            {/* Policies and Made in Nepal */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-base text-gray-300">
              <div className="flex gap-6">
                <span className="hover:text-white cursor-pointer transition-colors duration-200">
                  Privacy Policy
                </span>
                <span className="hover:text-white cursor-pointer transition-colors duration-200">
                  Terms of Service
                </span>
              </div>
              <span className="font-semibold text-lg" style={{ color: "#Fdda00" }}>
                Made in Nepal
              </span>
            </div>
=======
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
>>>>>>> jivan
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
