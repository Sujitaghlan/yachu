const express = require("express");
const { userRouter } = require("./user.routes");
const { productRouter } = require("./product.routes");
const { reviewRouter } = require("./review.routes");
const { orderRouter } = require("./order.routes");
const { cartRouter } = require("./cart.routes");
const { categoryRouter } = require("./category.routes");
const { adProductRouter } = require("./adProduct.routes");
const { emailRouter } = require("./mail.routes");
const { galleryRouter } = require("./gallery.routes");
const router = express.Router();

router.use("/auth", userRouter);
router.use(productRouter);
router.use(reviewRouter);
router.use(orderRouter);
router.use(cartRouter);
router.use(categoryRouter);
router.use(adProductRouter);
router.use(emailRouter);
router.use(galleryRouter);

module.exports = { router };
