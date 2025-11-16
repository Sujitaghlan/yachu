const { Order, Cart, Product } = require("../models");

// Create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, address, phone, paymentType } = req.body;

    const cart = await Cart.findOne({ userId }).populate("products.productId");
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    let totalAmount = 0;
    const orderProducts = [];

    for (let item of cart.products) {
      const product = item.productId;
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

    const order = await Order.create({
      fullName,
      address,
      phone,
      paymentType,
      status: "pending",
      userId,
      products: orderProducts,
      totalAmount,
      stockDeducted: false, 
    });

    cart.products = [];
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
      .json({ success: false, message: "Error while placing order" });
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

const updateStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId).populate("products.productId");
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (status === "paid" && !order.stockDeducted) {
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

    if (status === "cancelled" && order.stockDeducted) {
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
    });
  }
};

module.exports = { createOrder, getAllOrder, updateStatus };
