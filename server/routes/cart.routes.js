const express = require("express");
const {addToCart, getCart, removeFromCart, updateQuantity} = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/authMiddleware");

const cartRouter = express.Router();

cartRouter.post("/cart", verifyToken, addToCart);
cartRouter.get("/cart", verifyToken, getCart);
cartRouter.delete("/cart/:productId", verifyToken, removeFromCart);
cartRouter.put("/cart/:productId", verifyToken, updateQuantity);

module.exports = {cartRouter};