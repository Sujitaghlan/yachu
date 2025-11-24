const express = require("express");
const {createImage, getAllImage, getImageById, updateImage, deleteImage} = require("../controllers/gallery.controller");
const { verifyToken } = require("../middleware/authMiddleware");
const {upload} = require("../middleware/multer");

const galleryRouter = express.Router();

galleryRouter.post("/gallery", upload.single("image"), createImage);
galleryRouter.get("/gallery", getAllImage);
galleryRouter.get("/gallery/:id", getImageById);
galleryRouter.put("/gallery/:id", upload.single("image"), updateImage);
galleryRouter.delete("/gallery/:id", deleteImage);

module.exports = {galleryRouter};