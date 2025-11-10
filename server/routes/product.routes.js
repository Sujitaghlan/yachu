const express = require("express");
const {
  addProduct,
  getAllProducts,
  getProductById,
  editProduct,
  removeProduct,
} = require("../controllers/product.controller");
const { upload } = require("../middleware/multer");

const productRouter = express.Router();

productRouter.post("/products", upload.single("image"), addProduct);
productRouter.get("/products", getAllProducts);
productRouter.get("/products/:id", getProductById);
productRouter.put("/products/:id", upload.single("image"), editProduct);
productRouter.delete("/products/:id", removeProduct);

module.exports = { productRouter };
