const express = require("express");
const {
  createOrder,
  getAllOrder,
  getOrderById,
  getOrderByUserId,
  updateStatus,
} = require("../controllers/order.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { upload } = require("../middleware/multer");
const orderRouter = express.Router();

orderRouter.post("/order", verifyToken, upload.single("image"), createOrder);
orderRouter.get("/orders/user", verifyToken, getOrderByUserId);
orderRouter.get("/orders", verifyToken, verifyAdmin, getAllOrder);
orderRouter.get("/orders/:orderId", verifyToken, verifyAdmin, getOrderById);

orderRouter.patch("/orders/:orderId", verifyToken, verifyAdmin, updateStatus);

module.exports = { orderRouter };
