const Review = require("../models/Review");

// Create a new review
const createReview = async (req, res) => {
  try {
    const { description, rating } = req.body;
    const user = req.user._id; 
    const existingReview = await Review.findOne({ user });
    if (existingReview) {
      return res.status(400).json({ message: "You have already submitted a review" });
    }

    const review = await Review.create({ user, description, rating });
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews with user info
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate("user", "name email");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate("user", "name email");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a review
const updateReview = async (req, res) => {
  try {
    const { description, rating } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (!review.user.equals(req.user._id)) {
      return res.status(403).json({ message: "You are not allowed to update this review" });
    }

    review.description = description || review.description;
    review.rating = rating || review.rating;

    await review.save();
    res.status(200).json({ message: "Review updated successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) return res.status(404).json({ message: "Review not found" });

    if (!review.user.equals(req.user._id)) {
      return res.status(403).json({ message: "You are not allowed to delete this review" });
    }

    await review.deleteOne();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
