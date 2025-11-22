const express = require("express");
const {userRouter} = require("./user.routes");
const {productRouter} = require("./product.routes");
const {reviewRouter} = require("./review.routes");
const { orderRouter } = require("./order.routes");
const {cartRouter} = require("./cart.routes");
const {offerRouter} = require("./offer.routes");
const {categoryRouter} = require("./category.routes");
const router = express.Router();

router.use("/auth", userRouter);
router.use(productRouter);
router.use(reviewRouter);
router.use(orderRouter);
router.use(cartRouter);
router.use(offerRouter);
router.use(categoryRouter);

module.exports = {router};