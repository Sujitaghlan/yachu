import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderById, updateOrderStatus } from "../../api/OrderApi";

function ViewOrder() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state?.order || null);

  useEffect(() => {
    if (order) return;

    const fetchOrder = async () => {
      try {
        const res = await getOrderById(id);
        setOrder(res.order);
      } catch (err) {
        console.error("Failed to fetch order", err);
      }
    };

    fetchOrder();
  }, [id, order]);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Loading order...
      </div>
    );
  }

  const formatted = {
    id,
    customer: order.fullName,
    address: order.address,
    contact: order.phone,
    payment: order.paymentType,
    status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
    date: order.createdAt ? order.createdAt.slice(0, 10) : "",
    amount: order.totalAmount,
    qty: order.products?.[0]?.quantity || 1,
    productName: order.products?.[0]?.productId?.productName || "Product",
    productImage: order.products?.[0]?.productId?.imageUrl || "/placeholder.png",
  };

  // Function to update order status
  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      console.error("Failed to update order status", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white py-6 px-4 md:px-10">
        <h1 className="text-xl md:text-2xl font-bold">Order Details</h1>
        <p className="text-sm md:text-base mt-1">Order ID: {id}</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 md:px-10 py-6 space-y-6">

        {/* Customer & Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Customer Info */}
          <div className="p-4 border rounded-md bg-white shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Customer Information</h2>
            <p><b>Name:</b> {formatted.customer}</p>
            <p><b>Phone:</b> {formatted.contact}</p>
            <p><b>Address:</b> {formatted.address}</p>
          </div>

          {/* Order Info */}
          <div className="p-4 border rounded-md bg-white shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Order Information</h2>
            <p><b>Date:</b> {formatted.date}</p>
            <p><b>Payment:</b> {formatted.payment}</p>
            <p><b>Status:</b> {formatted.status}</p>
          </div>
        </div>

        {/* Order Item */}
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Order Item</h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src={formatted.productImage}
              className="w-24 h-28 sm:w-20 sm:h-24 object-contain"
            />
            <div className="flex-1 text-sm sm:text-base">
              <p className="font-bold">{formatted.productName}</p>
              <p>Quantity: {formatted.qty}</p>
            </div>
            <p className="font-bold text-base sm:text-lg">
              Rs. {formatted.amount}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md bg-white shadow-sm">
          <div className="space-y-1 text-sm md:text-base">
            <p>Subtotal: Rs. {formatted.amount}</p>
            <p>Shipping: Rs. 100</p>
          </div>
          <p className="font-bold text-lg mt-2 md:mt-0">
            Total: Rs. {formatted.amount + 100}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          {(order.status === "Pending" || order.status === "Confirmed") && (
            <>
              {order.status === "Pending" && (
                <button
                  onClick={() => handleStatusUpdate("Confirmed")}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Confirm
                </button>
              )}
              <button
                onClick={() => handleStatusUpdate("Canceled")}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                Cancel
              </button>
            </>
          )}

          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
