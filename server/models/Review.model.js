const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    description: { type: String },
    rating: { type: Number, min: 0, max: 5, required: true },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
