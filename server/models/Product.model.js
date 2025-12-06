const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number },
    description: { type: String },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    netContent: { type: String },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
    adProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdProduct",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
