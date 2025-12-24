import React, { useEffect, useState } from "react";
import { LuDroplet, LuDroplets } from "react-icons/lu";
import { FaBottleDroplet, FaBox } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import ProductCard from "../utils/ProductCard";
import { getAllProducts } from "../api/productApi";
import { getAllAds } from "../api/adApi";

function OurProducts({ search }) {
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        const productsArray = Array.isArray(res.data) ? res.data : [];
        setProducts(productsArray);
      } catch (error) {
        console.error("Get Products Error:", error);
        setProducts([]); // fallback to empty array
      }
    };

    const fetchAds = async () => {
      try {
        const res = await getAllAds();
        const adsArray = Array.isArray(res.ads) ? res.ads : [];
        setAds(adsArray);
      } catch (error) {
        console.error("Get Ads Error:", error);
        setAds([]); // fallback
      }
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
    const matchCategory =
      filterCategory === "All" || p.category.name === filterCategory;
    const matchSearch = p.productName
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="w-full py-10 bg-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center font-headline">
        Our Products
      </h2>

      {/* Category filter icons with proper centering */}
      <div className="flex justify-center items-center gap-6 md:gap-10 mb-10">
        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("All")}
        >
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-full bg-yellow-300 shadow ${
              filterCategory === "All" ? "ring-2 ring-primary" : ""
            }`}
          >
            <AiOutlineProduct size={22} className="text-black" />{" "}
            {/* You can use any icon here */}
          </div>
          <p className="text-sm font-paragraph">All</p>
        </div>
        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("Hair Oil")}
        >
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-full bg-yellow-300 shadow ${
              filterCategory === "Hair Oil" ? "ring-2 ring-primary" : ""
            }`}
          >
            <LuDroplet size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Hair Oil</p>
        </div>

        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("Shampoo")}
        >
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-full bg-yellow-300 shadow ${
              filterCategory === "Shampoo" ? "ring-2 ring-primary" : ""
            }`}
          >
            <FaBottleDroplet size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Shampoo</p>
        </div>

        {/* <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("sachet-oil")}
        >
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-full bg-blue-300 shadow ${
              filterCategory === "sachet-oil" ? "ring-2 ring-primary" : ""
            }`}
          >
            <LuDroplets size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Sachet Oil</p>
        </div>

        <div
          className="flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => setFilterCategory("sachet-shampoo")}
        >
          <div
            className={`w-10 h-10 flex justify-center items-center rounded-full bg-blue-200 shadow ${
              filterCategory === "sachet-shampoo" ? "ring-2 ring-primary" : ""
            }`}
          >
            <FaBox size={22} className="text-black" />
          </div>
          <p className="text-sm font-paragraph">Sachet Shampoo</p>
        </div> */}
      </div>

      {/* Products container with same padding as NavBar */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        {filtered.length === 0 && (
          <p className="text-center text-gray-500 text-lg font-paragraph py-10">
            No products found.
          </p>
        )}

        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide 
                       md:grid md:grid-cols-3 md:gap-6 
                       2xl:grid-cols-4 lg:gap-8 md:overflow-visible"
        >
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
