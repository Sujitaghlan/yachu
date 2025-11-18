const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
     imageUrl: { type: String, required: true },
    imagePublicId: { type: String },
  }
)

module.exports = mongoose.model("Offer", offerSchema);