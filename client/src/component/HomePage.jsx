import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import productImg1 from "../assets/oil.png";
import productImg2 from "../assets/sachet_shampoo-removebg-preview - Copy.png";
import productImg3 from "../assets/product.png";

const images = [productImg1, productImg2, productImg3];

export default function MobileHero() {
  const [current, setCurrent] = useState(0);

  // Auto-change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Go to previous image
  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // Go to next image
  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="w-full bg-white pt-0 pb-4 px-3 sm:px-6 md:px-24 lg:px-32 xl:px-44">
      <div className="flex flex-row flex-wrap items-start justify-between w-full md:items-center md:justify-between">

        {/* LEFT CONTENT */}
        <div className="w-1/2 sm:w-full pt-12 md:pt-0 md:w-[45%]">
          <h2 className="text-h1 md:text-heading font-headline text-primary leading-snug">
            Dandruff Case
          </h2>
          <p className="text-paragraph md:text-[20px] text-tertiary leading-[30px] mt-1 md:mt-4 font-paragraph">
            यसको प्रयोगले कपालबाट चाँहाँ हटाउँछ र <br />
            कपाल झर्न रोक्नुकासाथै नयाँँ कपाल <br />
            उमाँर्छ
          </p>
          {/* BUTTONS */}
          <div className="flex flex-wrap gap-2 md:gap-5 mt-3 md:mt-8">
            <button className="bg-primary text-white font-semibold text-paragraph md:text-[18px] px-4 py-2 md:px-8 md:py-3 rounded-full hover:scale-105 transition-transform duration-300">
              Buy Now
            </button>
            <button className="border border-secondary text-black font-semibold text-paragraph md:text-[18px] px-5 py-2 md:px-10 md:py-3 rounded-full hover:scale-105 transition-transform duration-300">
              View
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE + ARROWS */}
        <div className="w-1/2 sm:w-full flex flex-col items-center md:w-[45%] md:items-center relative mt-6 sm:mt-8 md:mt-0">

          {/* PRODUCT IMAGE */}
          <div className="relative w-full flex justify-center items-center md:h-[400px]">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`product-${index}`}
                className={`
                  object-contain drop-shadow-xl
                  w-[150px] sm:w-[180px] md:w-[360px] lg:w-[420px] xl:w-[480px]
                  transition-opacity duration-500
                  ${index === current ? "opacity-100 z-10 relative" : "opacity-0 z-0 absolute md:absolute"}
                `}
                style={{ maxHeight: "400px" }}
              />
            ))}
          </div>

          {/* DESKTOP ARROWS */}
          <div className="hidden md:flex gap-6 mt-10 lg:gap-8">
            <button
              onClick={prevImage}
              className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg hover:bg-[#002244] transition"
            >
              <FaChevronLeft className="text-white text-2xl" />
            </button>
            <button
              onClick={nextImage}
              className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg hover:bg-[#002244] transition"
            >
              <FaChevronRight className="text-white text-2xl" />
            </button>
          </div>

          {/* MOBILE ARROWS */}
          <div className="flex gap-2 mt-2 md:hidden">
            <button
              onClick={prevImage}
              className="w-8 h-8 bg-primary rounded-md flex items-center justify-center"
            >
              <FaChevronLeft className="text-white text-sm" />
            </button>
            <button
              onClick={nextImage}
              className="w-8 h-8 bg-primary rounded-md flex items-center justify-center"
            >
              <FaChevronRight className="text-white text-sm" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
