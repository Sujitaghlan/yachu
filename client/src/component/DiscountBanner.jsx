import React, { useEffect, useState } from "react";
import DynamicAdCard from "./DynamicAdCard";
import { getAllAds } from "../api/adApi";

export default function DiscountBanner() {
  const [ads, setAds] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await getAllAds();

        if (res.success && Array.isArray(res.ads) && res.ads.length > 0) {
          const dynamicAds = res.ads
            .filter((a) => a.productId)
            .map((a) => ({
              id: a.productId?._id, 
              productName:
                a.productId?.productName?.replace(/"/g, "") ||
                "Unknown Product",
              productPrice: a.productPrice || 0,
              discountPercent: a.discountPercent || 0,
              discountedPrice: a.discountedPrice || 0,
              adContent: a.adContent || "",
              netContent: a.productId?.netContent || "",
              imageUrl: a.productId?.imageUrl || "/placeholder.png",
            }));

          setAds(dynamicAds);
        }
      } catch (err) {
        console.error("Error fetching ads:", err);
      }
    };

    fetchAds();
  }, []);

  useEffect(() => {
    if (ads.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [ads.length]);

  return (
    <div className="w-full px-4 md:px-8 lg:px-16 xl:px-20 2xl:px-24 py-4">
      {ads.length > 0 && <DynamicAdCard ad={ads[currentIndex]} />}
    </div>
  );
}
