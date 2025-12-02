import React from "react";
import Button from "../utils/Button";
import discountImage from "../assets/oil.png";

export default function StaticAdCard() {
  const ad = {
    productName: "Yachu Hair oil",
    productPrice: 200,
    discountPercent: 10,
    discountedPrice: 180,
    adContent: "Get healthy hair with Yachu Hair oil",
    netContent: "3 bottels",
    imageUrl: discountImage,
  };

  return (
    <div className="w-full bg-gradient-to-r from-primary to-info p-6 rounded-lg text-white font-paragraph relative flex items-center gap-1 md:flex-row md:justify-between mx-auto animate-slide-in-left">

      {/* Left text section */}
      <div className="flex flex-col flex-1 text-left animate-fade-in-up">
        <h1 className="text-heading font-headline font-bold mb-2 md:text-[55px]">
          Get <span className="text-green">{ad.discountPercent}%</span>
        </h1>
        <p className="text-h2 font-paragraph mb-1 md:text-[20px] md:leading-snug">
          discount <br />
          when you purchase <br />
          <span className="text-tertiary text-xs md:text-sm font-normal">
            {ad.netContent}
          </span>
        </p>
        <p className="font-headline text-h3 mt-1 md:text-[14px]">{ad.productName}</p>

        <Button
          className="mt-4 text-center text-sm md:text-lg leading-[30px] md:leading-[40px] hover:bg-green/90 animate-pulse-slow"
          background="#00FF00"
          textColor="#013067"
          width="140px"
          padding="10px 0"
          borderRadius="8px"
        >
          Shop Now
        </Button>
      </div>

      {/* Right image and discount badge */}
      <div className="relative w-[160px] h-[220px] flex flex-col items-center justify-center border border-white rounded-md md:w-[300px] md:h-[400px] animate-fade-in-down">
        <img
          src={ad.imageUrl}
          alt={ad.productName}
          className="object-contain w-[200px] h-[220px] sm:w-[80px] sm:h-[96px] md:w-[280px] md:h-[380px]"
        />
        <div className="absolute top-0 left-0 bg-white text-primary font-bold text-xs md:text-lg px-3 py-1 md:px-4 md:py-2 rounded-sm border border-primary select-none animate-bounce-slow">
          {ad.discountPercent}% OFF
        </div>
      </div>
    </div>
  );
}