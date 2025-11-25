const { cloudinary } = require("../config/cloudinary");
const { Gallery } = require("../models");
const {
  uploadBufferToCloudinary,
} = require("../utils/uploadBufferToCloudinary");
const createImage = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const { url, publicId } =
      await uploadBufferToCloudinary(req.file.buffer, "gallery_images");
    const { description } = req.body;
    const newGallery = new Gallery({
      imageUrl: url,
      imagePublicId: publicId,
      description,
    });
    await newGallery.save();
    res.status(200).json({
      success: true,
      message: "Image uploaded to gallery successfully",
      gallery: newGallery,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to upload image to gallery",
      err: err.message,
    });
  }
};

const getAllImage = async (req, res) => {
  try {
    const image = await Gallery.find();
    res.status(200).json({ success: true, image });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch gallery" });
  }
};

const getImageById = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Gallery.findById(id);

    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }

    res.status(200).json({ success: true, image });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching gallery item",
      err: err.message,
    });
  }
};

const updateImage = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Gallery.findById(id);

    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }

    let updatedData = {
      description: req.body.description || image.description,
    };

    if (req.file) {
      if (image.imagePublicId) {
        await cloudinary.uploader.destroy(image.imagePublicId);
      }
      const newImage = await uploadBufferToCloudinary(
        req.file.buffer,
        "gallery_images"
      );

      updatedData.imageUrl = newImage.url;
      updatedData.imagePublicId = newImage.publicId;
    }

    const updatedImage = await Gallery.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Gallery updated successfully",
      image: updatedImage,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update gallery",
      error: err.message,
    });
  }
};

// DELETE
const deleteImage = async (req, res) => {
  try {
    const id = req.params.id;
    const image = await Gallery.findById(id);

    if (!image) {
      return res
        .status(404)
        .json({ success: false, message: "Gallery item not found" });
    }
    if (image.imagePublicId) {
      await cloudinary.uploader.destroy(image.imagePublicId);
    }

    await image.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete gallery",
      error: err.message,
    });
  }
};

module.exports = {
  createImage,
  getAllImage,
  getImageById,
  updateImage,
  deleteImage,
};
