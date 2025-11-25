const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
