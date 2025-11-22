import React from "react";
import { LuDroplet, LuDroplets } from "react-icons/lu";
import { FaBottleDroplet, FaBox } from "react-icons/fa6";
import productImg from "../assets/sachet_shampoo-removebg-preview - Copy.png";
import ProductCard from "../utils/ProductCard";

function OurProducts() {
  const products = [
    { id: 1, title: "Dandruff Case", description: "यसको प्रयोगले कपालकाे बोशी हटाएर र कपाल छिनी रोकिदिन्छ साथै नयाँ कपाल उम्राउँछ", size: "250ml", price: "Rs. 2,500" },
    { id: 2, title: "Hair Oil", description: "यसले कपाल झर्ने रोक्छ र कपाललाई मजबुत बनाउँछ", size: "250ml", price: "Rs. 2,500" },
    { id: 3, title: "Hair Case", description: "कपाललाइ मुलायम बनाउने साथै पोषण प्रदान गर्ने", size: "250ml", price: "Rs. 2,500" },
    { id: 4, title: "Baldness Case", description: "यसले प्रयोगले नयाँ कपाल उम्रन मद्दत गर्छ", size: "250ml", price: "Rs. 2,500" },
    { id: 5, title: "Hair Growth Oil", description: "कपालको स्वास्थ्य बढाउने तेल", size: "100ml", price: "Rs. 1,800" },
    { id: 6, title: "Anti-Hairfall Shampoo", description: "कपाल झर्ने कम गर्नको लागि श्याम्पू", size: "200ml", price: "Rs. 1,200" },
  ];

  return (
    <div className="w-full flex flex-col items-center py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Our Products</h2>

      <div className="flex items-center gap-10 mb-10">
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-yellow-300 shadow">
            <LuDroplet size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Hair Oil</p>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-700 shadow">
            <FaBottleDroplet size={22} className="text-white" />
          </div>
          <p className="text-sm font-paragraph">Shampoo</p>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-300 shadow">
            <LuDroplets size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Sachet Oil</p>
        </div>
        <div className="flex flex-col items-center gap-1 cursor-pointer">
          <div className="w-10 h-10 flex justify-center items-center rounded-full bg-blue-200 shadow">
            <FaBox size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Sachet Shampoo</p>
        </div>
      </div>

      <div className="w-full px-6 md:px-20 pb-6">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
          {products.map((item) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              size={item.size}
              price={item.price}
              productImg={productImg} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurProducts;
