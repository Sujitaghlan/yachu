const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  editProduct,
  removeProduct,
} = require("../controllers/product.controller");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/verifyAdmin");

const productRouter = express.Router();

productRouter.post(
  "/products",
  // verifyToken,
  // verifyAdmin,
  upload.single("image"),
  addProduct
);
productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProductById);
productRouter.put(
  "/products/:id",
  upload.single("image"),
  editProduct
);
productRouter.delete("/products/:id", removeProduct);

module.exports = { productRouter };
