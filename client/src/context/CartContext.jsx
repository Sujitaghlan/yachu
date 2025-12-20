import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  addToCartApi,
  updateCartQuantityApi,
  removeFromCartApi,
  getCartApi,
} from "../api/CartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Function to fetch cart from server (works based on auth token)
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      const res = await getCartApi();
      // Filter out items with null products and map to cart items
      const serverItems = res.data.items
        .filter((item) => item.product !== null && item.product !== undefined)
        .map((item) => ({
          cartItemId: item._id,
          id: item.product._id,
          title: item.product.productName,
          productImg: item.product.imageUrl,
          price: item.product.price,
          discountedPrice: item.product.discountedPrice,
          qty: item.quantity,
        }));
      setCartItems(serverItems);
    } catch (error) {
      // If 401, user is not authenticated, clear cart
      if (error.response?.status === 401) {
        setCartItems([]);
      } else {
        console.error("Error fetching cart:", error);
        setCartItems([]);
      }
    }
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Listen for login/logout events (same window)
  useEffect(() => {
    const handleLogin = () => {
      // Small delay to ensure token is saved
      setTimeout(() => {
        fetchCart();
      }, 100);
    };

    const handleLogout = () => {
      setCartItems([]);
    };

    window.addEventListener("userLogin", handleLogin);
    window.addEventListener("userLogout", handleLogout);

    return () => {
      window.removeEventListener("userLogin", handleLogin);
      window.removeEventListener("userLogout", handleLogout);
    };
  }, [fetchCart]);

  // Add product to cart
  const addToCart = async (product, qty = 1) => {
    const productId = product.id || product._id;
    try {
      const response = await addToCartApi(productId, qty);
      // Filter out items with null products and map to cart items
      const serverItems = response.data.cart.items
        .filter((item) => item.product !== null && item.product !== undefined)
        .map((item) => ({
          cartItemId: item._id,
          id: item.product._id,
          title: item.product.productName,
          productImg: item.product.imageUrl,
          price: item.product.price,
          discountedPrice: item.product.discountedPrice,
          qty: item.quantity,
        }));
      setCartItems(serverItems);
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  // Update quantity
  const updateQuantity = async (cartItemId, action) => {
    if (!cartItemId) {
      console.error("Update quantity failed: cartItemId is missing");
      return;
    }

    const item = cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) {
      console.error(
        "Update quantity failed: item not found in cart",
        cartItemId
      );
      return;
    }

    const newQty = action === "inc" ? item.qty + 1 : Math.max(item.qty - 1, 1);

    try {
      const response = await updateCartQuantityApi(item.cartItemId, newQty);
      // Filter out items with null products and map to cart items
      const serverItems = response.data.cart.items
        .filter((item) => item.product !== null && item.product !== undefined)
        .map((item) => ({
          cartItemId: item._id,
          id: item.product._id,
          title: item.product.productName,
          productImg: item.product.imageUrl,
          price: item.product.price,
          discountedPrice: item.product.discountedPrice,
          qty: item.quantity,
        }));
      setCartItems(serverItems);
    } catch (error) {
      console.error("Update quantity failed", error);
      // If update fails, refresh cart from server to sync state
      fetchCart();
    }
  };

  // Remove item
  const removeFromCart = async (cartItemId) => {
    try {
      const response = await removeFromCartApi(cartItemId);

      // Filter out items with null products and map to cart items
      const updatedItems = response.data.cart.items
        .filter((item) => item.product !== null && item.product !== undefined)
        .map((item) => ({
          cartItemId: item._id,
          id: item.product._id,
          title: item.product.productName,
          productImg: item.product.imageUrl,
          price: item.product.price,
          discountedPrice: item.product.discountedPrice,
          qty: item.quantity,
        }));

      setCartItems(updatedItems);
    } catch (error) {
      console.error("Remove from cart failed", error);
    }
  };

  const clearCart = () => setCartItems([]);

  // Derived values
  const totalItems = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    const priceToUse = item.discountedPrice || item.price; 
    return sum + priceToUse * item.qty;
  }, 0);

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
