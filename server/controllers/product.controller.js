const { cloudinary } = require("../config/cloudinary.js");
const { uploadBufferToCloudinary } = require("../utils/uploadBufferToCloudinary");
const {Product} = require("../models")
const addProduct = async (req, res) => {
  try {
    const { productName, description, price, category, netContent, stock, discountedPrice } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    const { url: imageUrl, publicId: imagePublicId } =
      await uploadBufferToCloudinary(req.file.buffer, "products");

    const newProduct = new Product({
      productName,
      description,
      price,
      discountedPrice,
      category,
      netContent,
      stock,
      imageUrl,
      imagePublicId,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: savedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", err:err.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    if (products.length === 0) {
      return res.status(404).json({
        message: "No Products available",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in server", error: err.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price, category, netContent, stock, discountedPrice } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (productName) product.productName = productName;
    if (description) product.description = description;
    if (price) product.price = Number(price);
    if (category) product.category = category;
    if (netContent) product.netContent = netContent;
    if (discountedPrice) product.discountedPrice = Number(discountedPrice);
    if (stock) product.stock = stock;

    if (req.file) {
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }
      const { url: imageUrl, publicId: imagePublicId } =
        await uploadBufferToCloudinary(req.file.buffer, "products");
      product.imageUrl = imageUrl;
      product.imagePublicId = imagePublicId;
    }
    const saved = await product.save();
    res.status(200).json({ message: "Product updated", product: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  editProduct,
  removeProduct,
  getProductById,
};
