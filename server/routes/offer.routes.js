const {postOffer, getOffers, deleteOffer} = require("../controllers/offer.controller");
const express = require("express");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyAdmin } = require("../middleware/verifyAdmin");
const { upload } = require("../middleware/multer");

const offerRouter = express.Router();

offerRouter.post("/offers",verifyToken, verifyAdmin, upload.single("image"), postOffer);
offerRouter.get("/offers", getOffers);
offerRouter.delete("/offers/:offerId", verifyToken, verifyAdmin, deleteOffer);  

module.exports = { offerRouter };