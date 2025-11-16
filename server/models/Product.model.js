const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    category: { type: String },
    quantity: { type: Number },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
  },
  { timestamps: true } 
);

module.exports = mongoose.model("Product", productSchema);
