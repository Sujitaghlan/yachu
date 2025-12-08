import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaMinus, FaTimes, FaShoppingCart } from "react-icons/fa";
import Button from "../utils/Button";

function Cart({ onClose }) {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
    discount,
    finalTotal,
  } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      navigate("/login");
      return;
    }

    onClose();
    navigate("/billing", { state: { fromCart: true } });
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-white shadow-2xl border-l border-gray-300 flex flex-col z-50 font-paragraph">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300">
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-xl text-primary" />
          <h2 className="font-semibold text-sm tracking-wide text-primary">
            SHOPPING CART
          </h2>
        </div>
        <button
          className="text-xl font-bold cursor-pointer text-tertiary"
          onClick={onClose}
        >
          <FaTimes />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {cartItems.length === 0 && (
          <p className="text-center mt-10 text-tertiary">Cart is empty</p>
        )}

        {cartItems.map((item, index) => (
          <div key={index} className="flex items-start gap-3 mb-6">
            <img
              src={item.productImg}
              alt={item.title}
              className="w-12 h-20 object-contain"
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-primary">{item.title}</p>
              {item.discountedPrice ? (
                <p className="text-sm text-tertiary">
                  Rs. {item.discountedPrice}
                </p>
              ) : (
                <p className="text-sm text-tertiary">Rs. {item.price} </p>
              )}

              <div className="flex items-center gap-3 mt-1">
                <button
                  className="border border-primary text-primary px-2 rounded text-xs hover:bg-primary hover:text-white transition"
                  onClick={() => updateQuantity(item.cartItemId, "dec")}
                >
                  <FaMinus />
                </button>
                <span className="text-sm text-primary">{item.qty}</span>
                <button
                  className="border border-primary text-primary px-2 rounded text-xs hover:bg-primary hover:text-white transition"
                  onClick={() => updateQuantity(item.cartItemId, "inc")}
                >
                  <FaPlus />
                </button>
              </div>

              <button
                className="text-red-500 text-xs mt-2 hover:underline flex items-center gap-1"
                onClick={() => removeFromCart(item.cartItemId)}
              >
                <FaTimes /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Subtotal + Checkout */}
      <div className="border-t border-gray-300 px-4 py-4">
        <div className="flex justify-between mb-2 text-primary font-bold text-base">
          <span>Subtotal</span>
          <span>Rs. {totalPrice.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between mb-2 text-green-600 font-semibold text-sm">
            <span>Discount (10%)</span>
            <span>- Rs. {discount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between mb-4 text-primary font-bold text-base">
          <span>Total</span>
          <span>Rs. {finalTotal.toFixed(2)}</span>
        </div>

        <Button
          onClick={handleCheckout}
          background="#003366"
          hoverBackground="#002451"
          textColor="#FFFFFF"
          padding="12px 0"
          width="100%"
          borderRadius="8px"
          className="font-semibold"
          disabled={cartItems.length === 0}
        >
          CHECKOUT
        </Button>
      </div>
    </div>
  );
}

export default Cart;
