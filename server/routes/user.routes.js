const express = require("express");
const {register, login, refresh, googleLogin, logout, forgotPassword, resetPassword, verifyOTP} = require("../controllers/users.controller");
const { upload } = require("../middleware/multer");
const { verifyToken } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.post("/register", upload.single("image"), register);
userRouter.post("/login", login);
userRouter.post("/refresh", refresh);
userRouter.post("/google-login", googleLogin);
userRouter.post("/logout", logout);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/verify-otp", verifyOTP);
userRouter.post("/reset-password", resetPassword);

module.exports = {
  userRouter
};

