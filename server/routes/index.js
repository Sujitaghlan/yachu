const express = require("express");
const {userRouter} = require("./user.routes");

const router = express.Router();

router.use("/auth", userRouter);

module.exports = {router};