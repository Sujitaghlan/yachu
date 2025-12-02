import React, { useEffect, useState } from "react";
import ProductCard from "../utils/ProductCard";
import { getAllProducts } from "../api/productApi";
import { getAllAds } from "../api/adApi";

function RelatedProducts({ currentProduct }) {
  const [products, setProducts] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsAndAds = async () => {
      try {
        const resProducts = await getAllProducts();
        const resAds = await getAllAds();

        const productList = resProducts.data.map((item) =>
          item.product ? item.product : item
        );
        setProducts(productList);
        setAds(resAds.ads || []);
      } catch (err) {
        console.error("Failed to load related products or ads:", err);
        setProducts([]);
        setAds([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndAds();
  }, []);

  if (loading) return <p className="text-center py-6">Loading related products...</p>;

  const relatedProducts = products.filter(
    (item) => item._id !== currentProduct.id && item._id !== currentProduct._id
  );

  if (!relatedProducts.length)
    return <p className="text-center py-6">No related products found.</p>;

  const getDiscountForProduct = (productId) => {
    if (!ads || !Array.isArray(ads)) return 0;
    const ad = ads.find((a) => a.productId && a.productId._id === productId);
    return ad ? ad.discountPercent : 0;
  };

  return (
    <div className="w-full py-6 bg-white">
      <h2 className="text-heading font-headline text-center mb-4">Related Products</h2>

      <div className="px-4 md:pl-20 md:pr-12 pb-3">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide md:grid md:grid-cols-3 md:gap-6 md:overflow-visible">
          {relatedProducts.map((item) => (
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

export default RelatedProducts;
