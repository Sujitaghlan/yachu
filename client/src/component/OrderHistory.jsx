import { useState, useEffect } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { getOrdersByUserId } from "../api/OrderApi";
import { useNavigate } from "react-router-dom";

function OrderHistory() {
  const [openOrder, setOpenOrder] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await getOrdersByUserId();
        setOrders(res.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, [user, navigate]);

  const toggleOrder = (orderId) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  if (!user) {
    return <p className="text-center mt-10">Redirecting to login...</p>;
  }

  return (
    <div className="font-paragraph p-4">
      <h1 className="text-2xl font-headline text-primary mb-6">
        Order History
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-tertiary">You have no orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-secondary rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleOrder(order._id)}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-primary">{order._id}</h3>
                    <p className="text-sm text-tertiary mt-1">
                      {order.createdAt?.slice(0, 10)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium text-primary">
                        Rs. {order.totalAmount}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                    <span className="text-primary text-lg">
                      {openOrder === order._id ? (
                        <FiChevronUp />
                      ) : (
                        <FiChevronDown />
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              {openOrder === order._id && (
                <div className="border-t border-secondary p-4 animate-fade-in-up">
                  <h4 className="font-medium text-primary mb-3">
                    Order Items ({order.products.length})
                  </h4>

                  <div className="space-y-3 mb-4">
                    {order.products.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded"
                      >
                        <img
                          src={item.productId?.imageUrl || "/placeholder.png"}
                          alt={item.productId?.productName || "Product"}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-primary">
                            {item.productId?.productName || "Product"}
                          </p>
                          <p className="text-sm text-tertiary">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-primary">
                          Rs. {item.productId?.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white border border-secondary rounded p-3">
                    <div className="flex justify-between mb-1">
                      <span className="text-tertiary">Subtotal:</span>
                      <span>Rs. {order.totalAmount}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-tertiary">Shipping:</span>
                      <span>Rs. {order.deliveryCharge}</span>
                    </div>
                    <div className="border-t mt-2 pt-2 flex justify-between font-bold text-primary">
                      <span>Total:</span>
                      <span>Rs. {order.totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
