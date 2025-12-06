const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    paymentType: { type: String, required: true },
    deliveryCharge: { type: Number, required: true },
    status: { type: String, default: "pending" },
    stockDeducted: { type: Boolean, default: false },
    note: { type: String },
    paymentSlip: {
      url: { type: String },
      publicId: { type: String },
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    subTotal: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
