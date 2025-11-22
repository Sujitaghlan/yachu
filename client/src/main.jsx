import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { CartProvider } from "./context/CartContext";

const container = document.getElementById("root");
createRoot(container).render(
  <CartProvider>
    <App />
  </CartProvider>
);
