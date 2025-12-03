const { Order, Cart, Product } = require("../models");
const { uploadBufferToCloudinary } = require("../utils/uploadBufferToCloudinary");
// Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, address, phone, paymentType, deliveryCharge, note } = req.body;

    let paymentSlip = null;
    if (paymentType === "esewa") {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Payment screenshot is required for eSewa.",
        });
      }

      paymentSlip = await uploadBufferToCloudinary(
        req.file.buffer,
        "payments"
      );
    }

    const cart = await Cart.findOne({ user:userId }).populate("items.product");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (let item of cart.items) {
      const product = item.product;
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}`,
        });
      }
      totalAmount += product.price * item.quantity;
      orderProducts.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
      });
    }

    totalAmount += Number(deliveryCharge);

    const order = await Order.create({
      fullName,
      address,
      phone,
      paymentType,
      deliveryCharge,
      paymentSlip,
      status: "pending",
      note,
      userId,
      products: orderProducts,
      totalAmount,
      stockDeducted: false, 
    });

    cart.items = [];
    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, message: "Error while placing order", err: err.message });
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
  try{
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("products.productId")
      .populate("userId", "fullName email");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
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
}

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
      return res.status(404).json({ success: false, message: "Order not found" });
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
      message: "Failed to update status",err: err.message,
    });
  }
};

module.exports = { createOrder, getAllOrder, getOrderById, updateStatus, getOrderByUserId };
