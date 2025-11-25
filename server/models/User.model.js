const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    imageUrl: {
      type: String,
    },
    imagePublicId: {
      type: String,
    },
    firebaseUid: { type: String, unique: true,
    sparse: true},
    refreshToken: { type: String },
    otp: { type: String, default: null },
    otpExpiry: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
