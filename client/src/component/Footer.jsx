import React from "react";
import logo from "../assets/logo.png";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="text-white py-12 px-4"
      style={{ backgroundColor: "#003366" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content - Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section with Logo */}
          <div className="lg:col-span-1">
            <div className="mb-4 flex flex-col items-center text-center">
              <div className="w-32 h-32 mb-2 transform -translate-y-4">
                <img
                  src={logo}
                  alt="Yachu Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="transform -translate-y-6">
                <p className="text-gray-300 italic text-lg">
                  Your Beautiful Hair
                  <br />
                  <span>with Yachu Hair Oil</span>
                </p>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#Fdda00" }}
            >
              Products
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
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
            </ul>
          </div>

          {/* About Yachu Section */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#Fdda00" }}
            >
              About Yachu
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
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
            </ul>
          </div>

          {/* Customer Care Section */}
          <div>
            <h3
              className="text-lg font-semibold mb-4 "
              style={{ color: "#Fdda00" }}
            >
              Customer Care
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm">
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
            </ul>
          </div>

          {/* Contact Us Section with Icons */}
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              style={{ color: "#Fdda00" }}
            >
              Contact Us
            </h3>
            <ul className="space-y-3 text-gray-300 text-sm">
              <li className="flex items-center hover:text-white transition-colors duration-200">
                <FaPhone className="mr-3" style={{ color: "#Fdda00" }} />
                <span>+977-9808731770</span>
              </li>
              <li className="flex items-center hover:text-white transition-colors duration-200">
                <FaPhone className="mr-3" style={{ color: "#Fdda00" }} />
                <span>+977-01-5927179</span>
              </li>
              <li className="flex items-center hover:text-white transition-colors duration-200">
                <FaEnvelope className="mr-3" style={{ color: "#Fdda00" }} />
                <span>uchityachu@gmail.com</span>
              </li>
              <li className="flex items-center hover:text-white transition-colors duration-200">
                <FaMapMarkerAlt className="mr-3" style={{ color: "#Fdda00" }} />
                <span>Bijulibazar, Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section with White Border */}
        <div className="border-t border-white pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="text-gray-300 text-sm text-center lg:text-left">
              <p>© 2023 Yachu Hair Oil. All rights reserved.</p>
            </div>

            {/* Policies and Made in Nepal */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-300">
              <div className="flex space-x-6">
                <span className="hover:text-white cursor-pointer transition-colors duration-200">
                  Privacy Policy
                </span>
                <span className="hover:text-white cursor-pointer transition-colors duration-200">
                  Terms of Service
                </span>
              </div>
              <span className="font-semibold" style={{ color: "#Fdda00" }}>
                Made in Nepal
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;