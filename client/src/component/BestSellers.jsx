import React, { useEffect, useState } from "react";
import ProductCard from "../utils/ProductCard";
import { getAllProducts } from "../api/productApi";
import { getAllAds } from "../api/adApi";

function BestSellers({ search }) {
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        // Ensure res.data is an array
        const productsArray = Array.isArray(res.data) ? res.data : [];
        setProducts(productsArray.slice(0, 8));
        console.log(productsArray);
      } catch (error) {
        console.error("Get Products Error:", error);
        setProducts([]); // fallback
      }
    };

    const fetchAds = async () => {
      try {
        const res = await getAllAds();
        const adsArray = Array.isArray(res.ads) ? res.ads : [];
        setAds(adsArray);
      } catch (error) {
        console.error("Get Ads Error:", error);
        setAds([]);
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

  const filtered = products.filter((p) =>
    p.productName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full py-6 bg-white">
      <h2 className="text-heading font-headline text-center mb-4">
        Best Sellers
      </h2>

      {/* Container with same padding as navbar */}
      <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 mx-auto">
        <div
          className="flex gap-4 overflow-x-auto scrollbar-hide 
                       md:grid md:grid-cols-2 md:gap-6 
                       lg:grid-cols-3 2xl:grid-cols-4 md:overflow-visible"
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

export default BestSellers;
