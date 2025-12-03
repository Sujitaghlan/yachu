import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { cartItems, addToCart, updateQuantity } = useCart();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center text-tertiary text-h2 font-paragraph">
        No product found.
      </div>
    );
  }

  const { id, title, description, size, price, productImg, discount } = state;

  // Find cart item
  const cartItem = cartItems.find((item) => item.id === id);
  const quantity = cartItem ? cartItem.qty : 0;
  const cartItemId = cartItem?.cartItemId;

  // Calculate discounted price
  const numericPrice = Number(price.toString().replace(/\D/g, ""));
  const discountedPrice = discount
    ? Math.round(numericPrice - (numericPrice * discount) / 100)
    : numericPrice;

  const handleAddToCart = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      navigate("/login");
      return;
    }

    addToCart({
      id,
      title,
      price: discountedPrice,
      productImg,
    });
  };

  const handleIncrease = () => updateQuantity(cartItemId, "inc");
  const handleDecrease = () => updateQuantity(cartItemId, "dec");

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="w-full bg-white px-4 py-2 md:py-4 flex justify-center font-paragraph">
      <div className="w-full max-w-7xl flex flex-col md:flex-row md:gap-6 gap-4 relative">
        {/* Back Button */}
        <button
          onClick={handleBack}
          aria-label="back"
          className="absolute left-4 top-4 bg-transparent p-2 rounded-md"
        >
          <FaArrowLeft className="text-[22px] text-black" />
        </button>

        {/* Product Image */}
        <div className="flex justify-center md:flex-1 md:justify-start">
          <div className="w-60 h-60 md:w-96 md:h-96 flex items-center justify-center">
            <img
              src={productImg}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-start md:justify-start mt-2 md:mt-0">
          <h1 className="text-h1 font-bold text-gray-900 text-center md:text-left font-headline">
            {title}
          </h1>

          <p className="text-tertiary text-paragraph mt-1 text-left ml-4">{size}</p>

          <div className="flex gap-2">
            {discount ? (
              <p className="text-[20px] font-semibold text-gray-900 mt-2 text-left ml-4">
                <span className="line-through text-gray-400 mr-2">Rs. {numericPrice}</span>
                <span className="text-primary">Rs. {discountedPrice}</span>
              </p>
            ) : (
              <p className="text-[20px] font-semibold text-gray-900 mt-2 text-left ml-4">
                Rs. {numericPrice}
              </p>
            )}
            <p className="text-[12px] text-secondary mt-4 text-left">
              inclusive of all taxes
            </p>
          </div>

          {/* Add to Cart / Quantity Selector */}
          <div className="mt-4 md:mt-5 w-full flex justify-center md:justify-start">
            {quantity === 0 ? (
              <Button
                onClick={handleAddToCart}
                background="#013067"
                hoverBackground="#002451"
                textColor="#FFFFFF"
                width="100%"
                padding="14px 20px"
                borderRadius="10px"
                className="shadow-sm md:w-64"
              >
                Add to Cart
              </Button>
            ) : (
              <div className="flex items-center justify-between border border-gray-300 rounded-lg overflow-hidden w-full md:w-64 h-12">
                <button
                  onClick={handleDecrease}
                  className="w-1/3 h-full flex items-center justify-center bg-white hover:bg-gray-50 border-r border-gray-300 text-xl font-bold transition-colors"
                >
                  –
                </button>

                <div className="w-1/3 h-full flex items-center justify-center bg-gray-50">
                  <span className="font-semibold text-lg">{quantity}</span>
                </div>

                <button
                  onClick={handleIncrease}
                  className="w-1/3 h-full flex items-center justify-center bg-white hover:bg-gray-50 border-l border-gray-300 text-xl font-bold transition-colors"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {/* Product Description */}
          <h3 className="mt-6 md:mt-8 font-semibold text-gray-900 text-h2">
            Product Description
          </h3>

          <p className="text-tertiary text-[14px] leading-relaxed mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
