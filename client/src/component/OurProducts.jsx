import React, { useEffect, useState } from "react";
import { LuDroplet, LuDroplets } from "react-icons/lu";
import { FaBottleDroplet, FaBox } from "react-icons/fa6";
import ProductCard from "../utils/ProductCard";
import { getAllProducts } from "../api/productApi";
import { getAllAds } from "../api/adApi";

function OurProducts({ search }) {
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      setProducts(res.data);
    };

    const fetchAds = async () => {
      const res = await getAllAds();
      setAds(res.ads || []); // ads array from API
    };

    fetchProducts();
    fetchAds();
  }, []);

  const getDiscountForProduct = (productId) => {
    if (!ads || !Array.isArray(ads)) return 0;
    const ad = ads.find((a) => a.productId && a.productId._id === productId);
    return ad ? ad.discountPercent : 0;
  };

  const filtered = products.filter((p) => {
    const matchCategory = filterCategory === "all" || p.category === filterCategory;
    const matchSearch = p.productName.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full flex flex-col items-center py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 font-headline">Our Products</h2>

      <div className="flex items-center gap-10 mb-10">
        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("oil")}
        >
          <div className={`w-10 h-10 flex justify-center items-center rounded-full bg-yellow-300 shadow ${filterCategory === "oil" ? "ring-2 ring-primary" : ""}`}>
            <LuDroplet size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Hair Oil</p>
        </div>

        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("shampoo")}
        >
          <div className={`w-10 h-10 flex justify-center items-center rounded-full bg-gray-700 shadow ${filterCategory === "shampoo" ? "ring-2 ring-primary" : ""}`}>
            <FaBottleDroplet size={22} className="text-white" />
          </div>
          <p className="text-sm font-paragraph">Shampoo</p>
        </div>

        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("sachet-oil")}
        >
          <div className={`w-10 h-10 flex justify-center items-center rounded-full bg-blue-300 shadow ${filterCategory === "sachet-oil" ? "ring-2 ring-primary" : ""}`}>
            <LuDroplets size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Sachet Oil</p>
        </div>

        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("sachet-shampoo")}
        >
          <div className={`w-10 h-10 flex justify-center items-center rounded-full bg-blue-200 shadow ${filterCategory === "sachet-shampoo" ? "ring-2 ring-primary" : ""}`}>
            <FaBox size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Sachet Shampoo</p>
        </div>
      </div>

      <div className="w-full px-6 md:px-20 pb-6">
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 text-lg font-paragraph py-10">
            No products found.
          </p>
        )}

        <div className="flex gap-6 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
          {filtered.map((item) => (
            <ProductCard
              key={item._id}
              id={item._id}
              title={item.productName}
              description={item.description}
              size={item.netContent}
              price={`Rs. ${item.price}`}
              productImg={item.imageUrl}
              discount={getDiscountForProduct(item._id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurProducts;
