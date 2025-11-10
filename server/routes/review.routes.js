const express = require("express");
const {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
} = require("../controllers/review.controller");
const { verifyToken } = require("../middleware/authMiddleware");

const reviewRouter = express.Router();

reviewRouter.post("/review",verifyToken, createReview);
reviewRouter.get("/review", getReviews);
reviewRouter.get("/review/:id", getReviewById);
reviewRouter.put("/review",verifyToken, updateReview);
reviewRouter.delete("/review",verifyToken, deleteReview);

module.exports = {reviewRouter};