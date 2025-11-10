const { cloudinary } = require("../config/cloudinary.js");
const Product = require("../models/Product.model.js");
const streamifier = require("streamifier");
const addProduct = async (req, res) => {
  try {
    const { productName, description, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload image to Cloudinary
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "yachu-products" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Image upload failed" });
        }

        // Save product to DB
        const newProduct = new Product({
          productName,
          description,
          price,
          category,
          imageUrl: result.secure_url,
          imagePublicId: result.public_id,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({
          message: "Product added successfully!",
          product: savedProduct,
        });
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res.status(404).json({
        message: "No Products available"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products
    })
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Error in server", error: err.message });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price, category } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update fields
    if (productName) product.productName = productName;
    if (description) product.description = description;
    if (price) product.price = Number(price);
    if (category) product.category = category;

    // If a new image is uploaded
    if (req.file) {
      // Delete old image from Cloudinary
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }

      // Upload new image
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'yachu-products' },
        async (error, result) => {
          if (error) return res.status(500).json({ message: 'Image upload failed' });
          product.imageUrl = result.secure_url;
          product.imagePublicId = result.public_id;

          const saved = await product.save();
          res.status(200).json({ message: 'Product updated', product: saved });
        }
      );
      return streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    }

    const saved = await product.save();
    res.status(200).json({ message: 'Product updated', product: saved });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { addProduct, getAllProducts, editProduct, removeProduct, getProductById };
