const { uploadBufferToCloudinary } = require("../utils/uploadBufferToCloudinary.js");
const { Offer } = require("../models");

const postOffer = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { url: imageUrl, publicId: imagePublicId } =
      await uploadBufferToCloudinary(req.file.buffer, "offers");

    const newOffer = new Offer({
      imageUrl,
      imagePublicId,
    });

    await newOffer.save();

    res.status(200).json({
      success: true,
      message: "Offer added successfully!",
      offer: newOffer,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err: err.message });
  }
};

const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({
      success: true,
      message: "Offers fetched successfully",
      offers,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err: err.message });
  }
};

const deleteOffer = async (req, res) => {
  try {
    const { offerId } = req.params;
    const offer = await Offer.findByIdAndDelete(offerId);
    if (!offer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err: err.message });
  }
};

module.exports = { postOffer, getOffers, deleteOffer };
