import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../utils/Button";

export default function DynamicAdCard({ ad }) {
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/product-view", {
      state: {
        id: ad.id, 
        title: ad.productName,
        description: ad.adContent,
        size: ad.netContent,
        price: ad.productPrice,
        discount: ad.discountPercent,
        productImg: ad.imageUrl,
      },
    });
  };

  return (
    <div className="w-full bg-gradient-to-r from-primary to-info p-6 rounded-lg text-white font-paragraph relative md:flex items-center gap-1 md:flex-row md:justify-between mx-auto animate-slide-in-left">

      {/* Mobile */}
      <div className="md:hidden w-full text-center mb-4">
        <h1 className="text-4xl font-headline font-bold">
          Get <span className="text-green">{ad.discountPercent}%</span>
        </h1>
        <p className="text-sm font-paragraph mt-1">DISCOUNT</p>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col flex-1 text-left animate-fade-in-up">
        <h1 className="text-heading font-headline font-bold mb-2 md:text-[55px]">
          Get <span className="text-green">{ad.discountPercent}%</span>
        </h1>

        <p className="text-h2 font-paragraph mb-1 md:text-[20px] md:leading-snug">
          discount <br />
          {ad.adContent} <br />
          <span className="text-tertiary text-xs md:text-sm font-normal">
            {ad.netContent}
          </span>
        </p>

        <p className="font-headline text-h3 mt-1 md:text-[14px]">
          {ad.productName}
        </p>

        <Button
          onClick={handleShopNow}
          className="mt-4 text-center text-sm md:text-lg hover:bg-green/90"
          background="#00FF00"
          textColor="#013067"
          width="140px"
          padding="10px 0"
          borderRadius="8px"
        >
          Shop Now
        </Button>
      </div>

      {/* Image */}
      <div className="relative w-[160px] h-[220px] md:w-[300px] md:h-[400px] mx-auto md:mx-0 border border-white rounded-md">
        <img
          src={ad.imageUrl}
          alt={ad.productName}
          className="object-contain w-full h-full"
        />
        <div className="absolute top-0 left-0 bg-white text-primary font-bold text-xs md:text-lg px-3 py-1 border border-primary">
          {ad.discountPercent}% OFF
        </div>
      </div>

      {/* Mobile CTA */}
      <div className="md:hidden w-full mt-6">
        <p className="text-center text-lg font-paragraph mb-2">
          {ad.productName}
        </p>
        <p className="text-center text-sm text-muted-foreground mb-4">
          {ad.adContent}
        </p>

        <Button
          onClick={handleShopNow}
          className="w-full text-center text-lg py-3 hover:bg-green/90"
          background="#00FF00"
          textColor="#013067"
          borderRadius="8px"
        >
          Shop Now
        </Button>
      </div>
    </div>
  );
}
