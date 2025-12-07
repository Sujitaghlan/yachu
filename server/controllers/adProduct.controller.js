const {AdProduct, Product}= require("../models");

// Create Ad
const createAd = async (req, res) => {
  try {
    const { productId, discountPercent, adContent } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const productPrice = Number(product.price);
    const discount = Number(discountPercent);
    const discountedPrice = Math.round(productPrice - (productPrice * discount) / 100);

    const ad = await AdProduct.create({
      productId,
      productPrice,
      discountPercent: discount,
      discountedPrice,
      adContent,
    });

    await Product.findByIdAndUpdate(productId, {
      discountedPrice,
      adProduct: ad._id,
    });

    res.status(201).json({ success: true, message: "Ad created successfully", ad });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to create ad", err: err.message });
  }
};

// Get all Ads
const getAllAds = async (req, res) => {
  try {
    const ads = await AdProduct.find().populate("productId");
    res.status(200).json({ success: true, ads });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch ads" });
  }
};

// Get single Ad by ID
const getAdById = async (req, res) => {
  try {
    const {adId} = req.params;
    const ad = await AdProduct.findById(adId).populate("productId");
    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    res.status(200).json({ success: true, ad });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get ad", err: err.message });
  }
};

// Update Ad
const updateAd = async (req, res) => {
  try {
    const { productId, discountPercent, adContent } = req.body;
    const {adId} = req.params;
    const ad = await AdProduct.findById(adId);
    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    if (productId) {
      const product = await Product.findById(productId);
      if (!product)
        return res.status(404).json({ success: false, message: "Product not found" });

      ad.productId = productId;
      ad.productPrice = product.price;
    }

    if (discountPercent) {
      ad.discountPercent = discountPercent;
      ad.discountedPrice = Math.round(
        ad.productPrice - (ad.productPrice * discountPercent) / 100
      );
    }

    if (adContent) ad.adContent = adContent;

    await ad.save();

    res.status(200).json({ success: true, message: "Ad updated successfully", ad });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update ad", err: err.message });
  }
};

// Delete Ad
const deleteAd = async (req, res) => {
  try {
    const {adId} = req.params;
       const ad = await AdProduct.findById(adId);
    if (!ad) {
      return res.status(404).json({ success: false, message: "Ad not found" });
    }

    const product = await Product.findById(ad.productId);
    if (product) {
      product.discountedPrice = null; // Reset discount
      await product.save();
    }

    await AdProduct.findByIdAndDelete(adId);

    res.status(200).json({ success: true, message: "Ad deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to delete ad", err: err.message });
  }
};

module.exports = {
  createAd,
  getAllAds,
  getAdById,
  updateAd,
  deleteAd,
};
