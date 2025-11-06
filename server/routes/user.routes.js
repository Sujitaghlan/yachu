const express = require("express");
const {register, login, refresh, google, logout, forgotPassword, resetPassword, verifyOTP} = require("../controllers/users.controller");

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/refresh", refresh);
userRouter.post("/google/callback", google);
userRouter.post("/logout", logout);
userRouter.post("/forgotPassword", forgotPassword);
userRouter.post("/verifyOTP", verifyOTP);
userRouter.post("/resetPassword", resetPassword);

module.exports = {
  userRouter
};

