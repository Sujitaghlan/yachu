import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function AdditionalInfo() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full max-w-md md:max-w-5xl mx-auto bg-white rounded-lg shadow-md px-6 md:px-32 py-6 md:py-8">
      {/* Header */}
      <div
        className="flex items-center justify-between mb-4 cursor-pointer"
        onClick={toggleOpen}
      >
        <h2 className="text-primary font-headline text-h2 md:text-xl text-left flex-1">
          ADDITIONAL INFORMATION
        </h2>
        {isOpen ? (
          <FaChevronUp className="text-primary md:text-lg" />
        ) : (
          <FaChevronDown className="text-primary md:text-lg" />
        )}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="text-tertiary space-y-3 text-left md:grid md:grid-cols-2 md:gap-x-12 md:gap-y-4 font-paragraph text-paragraph">
          <div>
            <p className="font-semibold">Manufactured By:</p>
            <p>
              Bhumi MDR industries Pvt. Ltd., Nagarjun, Kathmandu Nepal -44600
            </p>
          </div>

          <div>
            <p className="font-semibold">Best Before</p>
            <p>3 Years</p>
          </div>

          <div>
            <p className="font-semibold">Country of Origin</p>
            <p>Nepal</p>
          </div>

          <div>
            <p className="font-semibold">Customer Care Details</p>
            <p>
              Ulpi Manandhar - uchityachu@gmail.com <br />
              +977-9808731770
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
