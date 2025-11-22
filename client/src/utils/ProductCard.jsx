import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import { useCart } from "../context/CartContext";

function ProductCard({ id, title, description, size, price, productImg }) {
  const navigate = useNavigate();
  const { cartItems, addToCart, updateQuantity } = useCart();

  const item = cartItems.find((i) => i.id === id);
  const quantity = item?.qty || 0;

  const handleAddToCart = () => {
    addToCart({ id, title, price: Number(price.replace(/\D/g, "")), productImg });
  };

  return (
    <div className="w-[240px] bg-white shadow-md rounded-xl p-4 flex-shrink-0 flex flex-col md:w-[300px] md:p-6">

      {/* Product Image */}
      <div
        className="flex justify-center items-center mb-3 cursor-pointer h-[150px] md:h-[200px]"
        onClick={() =>
          navigate("/product-view", { state: { id, title, description, size, price, productImg } })
        }
      >
        <img
          src={productImg}
          className="max-h-full object-contain"
          alt="product"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-headline mb-1 text-center md:text-xl">
        {title}
      </h3>

      {/* Description */}
      <div className="w-full text-left mb-2 overflow-hidden">
        <p className="text-tertiary text-paragraph leading-tight break-words whitespace-normal font-paragraph md:text-base">
          {description}
        </p>
      </div>

      {/* Size + Price */}
      <div className="w-full text-left mb-3 md:mb-4">
        <p className="text-tertiary text-paragraph font-paragraph md:text-base">{size}</p>
        <p className="font-semibold text-paragraph md:text-lg">{price}</p>
      </div>

      {/* Button / Quantity */}
      <div className="mt-auto w-full flex items-center justify-center">
        {quantity === 0 ? (
          <Button
            onClick={handleAddToCart}
            borderRadius="6px"      
            padding="10px 20px"    
            width="100%"            
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-center space-x-4 bg-white shadow-md rounded-xl px-3 py-2 w-full md:w-[260px]">
            <button
              onClick={() => updateQuantity(id, "dec")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-md text-lg font-bold"
            >
              –
            </button>

            <span className="font-semibold text-lg">{quantity}</span>

            <button
              onClick={() => updateQuantity(id, "inc")}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 shadow-md text-lg font-bold"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
