const express = require("express");
const {createAd, getAllAds, getAdById, updateAd, deleteAd} = require("../controllers/adProduct.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/verifyAdmin");

const adProductRouter = express.Router();
adProductRouter.post("/ads", verifyToken, verifyAdmin, createAd);
adProductRouter.get("/ads", getAllAds);
adProductRouter.get("/ads/:adId", getAdById);
adProductRouter.put("/ads/:adId", verifyToken, verifyAdmin, updateAd);
adProductRouter.delete("/ads/:adId", verifyToken, verifyAdmin, deleteAd);

module.exports = { adProductRouter };