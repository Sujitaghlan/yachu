const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
     user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    description: { type: String },
    rating: { type: Number, min: 0, max: 5, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
