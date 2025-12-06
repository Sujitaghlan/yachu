const express = require("express");
const {addToCart, getCart, removeFromCart, updateQuantity} = require("../controllers/cart.controller");
const { verifyToken } = require("../middleware/authMiddleware");

const cartRouter = express.Router();

cartRouter.post("/cart", verifyToken, addToCart);
cartRouter.get("/cart/:userId", verifyToken, getCart);
cartRouter.delete("/cart/:cartItemId", verifyToken, removeFromCart);
cartRouter.put("/cart/:cartItemId", verifyToken, updateQuantity);

module.exports = {cartRouter};