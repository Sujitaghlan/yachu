import { createContext, useContext, useState, useEffect } from "react";
import {
  addToCartApi,
  updateCartQuantityApi,
  removeFromCartApi,
  getCartApi,
} from "../api/CartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Fetch cart on load
  useEffect(() => {
    if (user?.id && token) {
      getCartApi(user.id)
        .then((res) => {
          const serverItems = res.data.items.map((item) => ({
            cartItemId: item._id,
            id: item.product._id,
            title: item.product.productName,
            productImg: item.product.imageUrl,
            price: item.product.price,
            qty: item.quantity,
          }));
          setCartItems(serverItems);
        })
        .catch(() => setCartItems([]));
    }
  }, [user?.id, token]);

  // Add product to cart
  const addToCart = async (product, qty = 1) => {
    const productId = product.id || product._id;
    try {
      const response = await addToCartApi(productId, qty);
      const serverItems = response.data.cart.items.map((item) => ({
        cartItemId: item._id,
        id: item.product._id,
        title: item.product.productName,
        productImg: item.product.imageUrl,
        price: item.product.price,
        qty: item.quantity,
      }));
      setCartItems(serverItems);
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  // Update quantity
  const updateQuantity = async (cartItemId, action) => {
    const item = cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    const newQty = action === "inc" ? item.qty + 1 : Math.max(item.qty - 1, 1);

    try {
      const response = await updateCartQuantityApi(item.id, newQty);
      const serverItems = response.data.cart.items.map((item) => ({
        cartItemId: item._id,
        id: item.product._id,
        title: item.product.productName,
        productImg: item.product.imageUrl,
        price: item.product.price,
        qty: item.quantity,
      }));
      setCartItems(serverItems);
    } catch (error) {
      console.error("Update quantity failed", error);
    }
  };

  // Remove item
 const removeFromCart = async (cartItemId) => {
  try {
    const response = await removeFromCartApi(cartItemId);

    const updatedItems = response.data.cart.items.map((item) => ({
      cartItemId: item._id,
      id: item.product?._id || "",
      title: item.product?.productName || "N/A",
      productImg: item.product?.imageUrl || "",
      price: item.product?.price || 0,
      qty: item.quantity || 1,
    }));

    setCartItems(updatedItems);
  } catch (error) {
    console.error("Remove from cart failed", error);
  }
};


  const clearCart = () => setCartItems([]);

  // Derived values
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );
  const discount = totalItems >= 3 ? totalPrice * 0.1 : 0;
  const finalTotal = totalPrice - discount;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
        discount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
