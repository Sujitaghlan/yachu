const express = require("express");
const {userRouter} = require("./user.routes");
const {productRouter} = require("./product.routes");
const {reviewRouter} = require("./review.routes");
const router = express.Router();

router.use("/auth", userRouter);
router.use(productRouter);
router.use(reviewRouter);

module.exports = {router};