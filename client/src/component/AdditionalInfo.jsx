import React, { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function AdditionalInfo() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="w-full py-8">
      {/* Outer container with same padding as NavBar */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        {/* Inner container */}
        <div className="w-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 md:p-8">
          {/* Header */}
          <div
            className="flex items-center justify-between mb-4 md:mb-6 cursor-pointer"
            onClick={toggleOpen}
          >
            <h2 className="text-primary font-headline text-xl md:text-2xl lg:text-3xl text-left flex-1">
              ADDITIONAL INFORMATION
            </h2>
            <div className="flex-shrink-0 ml-4">
              {isOpen ? (
                <FaChevronUp className="text-primary text-xl md:text-2xl" />
              ) : (
                <FaChevronDown className="text-primary text-xl md:text-2xl" />
              )}
            </div>
          </div>

          {/* Content with Tailwind animation */}
          {isOpen && (
            <div className="text-tertiary space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-6 lg:gap-x-12 lg:gap-y-8 font-paragraph text-base md:text-lg 
                            animate-fade-in-up">
              <div>
                <p className="font-semibold text-primary mb-1 md:mb-2">Manufactured By:</p>
                <p className="leading-relaxed">
                  Bhumi MDR industries Pvt. Ltd., Nagarjun, Kathmandu Nepal -44600
                </p>
              </div>

              <div>
                <p className="font-semibold text-primary mb-1 md:mb-2">Best Before</p>
                <p className="leading-relaxed">3 Years</p>
              </div>

              <div>
                <p className="font-semibold text-primary mb-1 md:mb-2">Country of Origin</p>
                <p className="leading-relaxed">Nepal</p>
              </div>

              <div>
                <p className="font-semibold text-primary mb-1 md:mb-2">Customer Care Details</p>
                <p className="leading-relaxed">
                 uchittraders50@gmail.com <br />
                  +977-9808731770
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}