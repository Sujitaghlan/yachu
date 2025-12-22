import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getAllProducts } from "../api/productApi";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function MobileHero() {
  const [current, setCurrent] = useState(0);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();
      console.log(res.data);
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  // Auto-slide image
  useEffect(() => {
    if (products.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [products]);

  const prevImage = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const goToSlide = (index) => {
    setCurrent(index);
  };

  const handleBuyNow = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      navigate("/login");
      return;
    }

    const product = products[current];

    addToCart({
      id: product._id,
      title: product.productName,
      price: Number(product.price),
      productImg: product.imageUrl,
    });
  };

  const handleViewProduct = () => {
    const product = products[current];

    navigate("/product-view", {
      state: {
        id: product._id,
        title: product.productName,
        description: product.description,
        size: product.size,
        price: product.price,
        productImg: product.imageUrl,
        discount: product.discount,
      },
    });
  };

  return (
    <div className="w-full bg-white pt-0 pb-4 px-3 sm:px-6 md:px-8 lg:px-16 xl:px-20 2xl:px-24">
      <div className="flex flex-col md:flex-row flex-wrap items-start justify-between w-full md:items-center md:justify-between">
        {/* ---------------- IMAGE SLIDER SECTION (First on mobile) ---------------- */}
        <div className="w-full flex flex-col items-center md:w-[45%] md:items-center relative md:mt-0 order-1 md:order-2">
          <div className="relative w-full flex justify-center items-center md:h-[400px]">
            {products.map((product, index) => (
              <img
                key={index}
                src={product.imageUrl || product.image}
                alt={product.productName}
                className={`
                  object-contain drop-shadow-xl
                  w-[200px] sm:w-[250px] md:w-[360px] lg:w-[420px] xl:w-[480px]
                  transition-opacity duration-500
                  ${
                    index === current
                      ? "opacity-100 z-10 relative animate-fade-in-up"
                      : "opacity-0 z-0 absolute"
                  }
                `}
                style={{ maxHeight: "400px" }}
              />
            ))}
          </div>

          {/* Desktop arrows */}
          <div className="hidden md:flex gap-6 mt-6 lg:gap-8">
            <button
              onClick={prevImage}
              className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg hover:bg-[#002244] transition-colors duration-300"
            >
              <FaChevronLeft className="text-white text-2xl" />
            </button>
            <button
              onClick={nextImage}
              className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center shadow-lg hover:bg-[#002244] transition-colors duration-300"
            >
              <FaChevronRight className="text-white text-2xl" />
            </button>
          </div>
        </div>

        {/* ---------------- TEXT SECTION (Second on mobile) ---------------- */}
        <div className="w-full pt-6 md:pt-0 md:w-[45%] animate-fade-in-up order-2 md:order-1">
          {/* Product Name - Centered on mobile */}
          <h2 className="text-h1 md:text-heading font-headline text-primary leading-snug text-center md:text-left">
            {products[current]?.productName || "Loading..."}
          </h2>

          {/* Description - Centered on mobile, below product name */}
          <p className="text-paragraph md:text-[20px] text-tertiary leading-[30px] mt-2 md:mt-4 font-paragraph text-center md:text-left">
           {products[current]?.description || "Loading product description..."}
          </p>

          {/* Action Buttons - Centered on mobile */}
          <div className="flex flex-wrap gap-3 md:gap-5 mt-4 md:mt-8 justify-center md:justify-start">
            {/* BUY NOW */}
            <button
              onClick={handleBuyNow}
              className="bg-primary text-white font-semibold text-paragraph md:text-[18px] px-6 py-3 md:px-8 md:py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-md"
            >
              Buy Now
            </button>

            {/* VIEW PRODUCT */}
            <button
              onClick={handleViewProduct}
              className="border border-secondary text-black font-semibold text-paragraph md:text-[18px] px-6 py-3 md:px-10 md:py-3 rounded-full hover:scale-105 transition-transform duration-300 shadow-sm"
            >
              View Product
            </button>
          </div>

          {/* Dot Navigation for Mobile */}
          <div className="flex gap-2 mt-6 justify-center md:hidden">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === current
                    ? "bg-primary scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


