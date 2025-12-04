const { Cart, Product } = require("../models");

// Add item to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );

    const subtotal = updatedCart.items.reduce((sum, item) => {
      return sum + item.quantity * item.product.price;
    }, 0);
    res
      .status(200)
      .json({
        message: "Added to cart successfully",
        cart: updatedCart,
        subtotal,
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get user's cart
const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product"
    );
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove item from cart
const removeFromCart = async (req, res) => {
  try {
    const { cartItemId } = req.params; // unique cart item id
    const cart = await Cart.findOne({ user: req.user._id }).populate("items.product");
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item._id.toString() !== cartItemId
    );

    await cart.save();
    await cart.populate("items.product"); // ensure product info is available

    res.status(200).json({ message: "Item removed successfully", cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { cartItemId } = req.params;
    const userId = req.user._id;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.id(cartItemId); // <-- perfect way!
    if (!item)
      return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;

    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId }).populate("items.product");

    res.status(200).json({
      message: "Quantity updated",
      cart: updatedCart
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


module.exports = { addToCart, getCart, removeFromCart, updateQuantity };
