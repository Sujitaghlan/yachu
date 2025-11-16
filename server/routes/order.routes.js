const express = require("express");
const {createOrder, getAllOrder, updateStatus} = require("../controllers/order.controller");
const {verifyToken} = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const orderRouter = express.Router();

orderRouter.post("/order", verifyToken, createOrder);
orderRouter.get("/orders", verifyToken, getAllOrder);
orderRouter.patch("/orders/:id/status", verifyToken, verifyAdmin, updateStatus);

module.exports = {orderRouter};

