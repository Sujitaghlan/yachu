const { Order, Cart, Product } = require("../models");
const {
  uploadBufferToCloudinary,
} = require("../utils/uploadBufferToCloudinary");
// Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, address, phone, paymentType, deliveryCharge, note } =
      req.body;

    // Handle payment slip for eSewa
    let paymentSlip = null;
    if (paymentType === "esewa") {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Payment screenshot is required for eSewa.",
        });
      }

      paymentSlip = await uploadBufferToCloudinary(req.file.buffer, "payments");
    }

    // Fetch cart
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    let subTotal = 0;
    const orderProducts = [];

    // Loop through cart items
    for (let item of cart.items) {
      const product = item.product;

      // Skip deleted products
      if (!product) continue;

      const priceToUse = Number(product.discountedPrice ?? product.price ?? 0);
      const quantity = Number(item.quantity ?? 0);

      if (product.stock < quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.productName}`,
        });
      }

      subTotal += priceToUse * quantity;

      orderProducts.push({
        productId: product._id,
        quantity,
        price: priceToUse,
      });
      await product.save();
    }

    const totalAmount = subTotal + Number(deliveryCharge ?? 0);

    // Create the order
    const order = await Order.create({
      fullName,
      address,
      phone,
      paymentType,
      deliveryCharge: Number(deliveryCharge ?? 0),
      paymentSlip,
      status: "pending",
      note,
      userId,
      products: orderProducts,
      subTotal,
      totalAmount,
      stockDeducted: true,
    });

    // Clear the cart
    cart.items = [];
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    return res.status(500).json({
      success: false,
      message: "Error while placing order",
      err: err.message,
    });
  }
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("products.productId")
      .populate("userId", "fullName email");
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("products.productId")
      .populate("userId", "fullName email");
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch order",
    });
  }
};

const getOrderByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ userId })
      .populate("products.productId")
      .populate("userId", "fullName email");
    res.status(200).json({
      success: true,
      message: "User orders fetched successfully",
      orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId).populate("products.productId");
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (status === "Confirmed" && !order.stockDeducted) {
      for (let item of order.products) {
        const product = await Product.findById(item.productId._id);
        if (product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Insufficient stock for ${product.name}`,
          });
        }
        product.stock -= item.quantity;
        await product.save();
      }
      order.stockDeducted = true;
    }

    if (status === "Cancelled" && order.stockDeducted) {
      for (let item of order.products) {
        const product = await Product.findById(item.productId._id);
        product.stock += item.quantity;
        await product.save();
      }
      order.stockDeducted = false;
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to update status",
      err: err.message,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrder,
  getOrderById,
  updateStatus,
  getOrderByUserId,
};
