import { FiFileText, FiCheckCircle, FiClock, FiTruck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrders, updateOrderStatus } from "../../api/OrderApi";

function OrderManagement() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getOrders();
        setOrders(res.orders || []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // UPDATE ORDER STATUS FUNCTION
  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);

      // Update UI instantly
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const totalOrders = orders.length;
  const completedOrders = orders.filter((o) => o.status === "Delivered").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const inTransitOrders = orders.filter((o) => o.status === "Shipped").length;

  const formatOrders = orders.map((o) => ({
    id: o._id,
    date: o.createdAt?.slice(0, 10),
    customer: o.fullName,
    address: o.address,
    contact: o.phone,
    amount: o.totalAmount,
    payment: o.paymentType,
    status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
    raw: o,
  }));

  // RENDER ACTION BUTTONS
  const renderActions = (status, id) => {
    switch (status) {
      case "Pending":
        return (
          <>
            <button
              onClick={() => handleStatusUpdate(id, "Confirmed")}
              className="bg-primary text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition"
            >
              Confirm
            </button>
            <button
              onClick={() => handleStatusUpdate(id, "Canceled")}
              className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-800 transition"
            >
              Cancel
            </button>
          </>
        );
      case "Confirmed":
        return (
          <>
            <button
              onClick={() => handleStatusUpdate(id, "Shipped")}
              className="bg-primary text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition"
            >
              Ship
            </button>
            <button
              onClick={() => handleStatusUpdate(id, "Canceled")}
              className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-800 transition"
            >
              Cancel
            </button>
          </>
        );
      case "Shipped":
        return (
          <button
            onClick={() => handleStatusUpdate(id, "Delivered")}
            className="bg-primary text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition"
          >
            Deliver
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full font-paragraph p-6">
      <h2 className="text-h2 font-headline text-primary mb-4">
        Manage your customer orders
      </h2>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-tertiary text-sm">Total Orders</p>
            <p className="text-3xl font-bold">{totalOrders}</p>
          </div>
          <FiFileText className="text-3xl text-icon" />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-tertiary text-sm">Completed Orders</p>
            <p className="text-3xl font-bold">{completedOrders}</p>
          </div>
          <FiCheckCircle className="text-3xl text-icon" />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-tertiary text-sm">Pending Orders</p>
            <p className="text-3xl font-bold">{pendingOrders}</p>
          </div>
          <FiClock className="text-3xl text-icon" />
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
          <div>
            <p className="text-tertiary text-sm">Orders in Transit</p>
            <p className="text-3xl font-bold">{inTransitOrders}</p>
          </div>
          <FiTruck className="text-3xl text-icon" />
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b font-semibold text-tertiary">
              <th className="py-2 text-left">Order Id</th>
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Customer</th>
              <th className="py-2 text-left">Address</th>
              <th className="py-2 text-left">Contact</th>
              <th className="py-2 text-left">Amount</th>
              <th className="py-2 text-left">Payment</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {formatOrders.map((o) => (
              <tr key={o.id} className="border-b">
                <td className="py-3">{o.id}</td>
                <td>{o.date}</td>
                <td>{o.customer}</td>
                <td>{o.address}</td>
                <td>{o.contact}</td>
                <td>Rs. {o.amount?.toLocaleString()}</td>
                <td>{o.payment}</td>

                <td>
                  {o.status === "Pending" && (
                    <span className="bg-yellow-200 text-tertiary px-3 py-1 rounded text-xs">Pending</span>
                  )}
                  {o.status === "Confirmed" && (
                    <span className="bg-green text-primary px-3 py-1 rounded text-xs">Confirmed</span>
                  )}
                  {o.status === "Shipped" && (
                    <span className="bg-info text-primary px-3 py-1 rounded text-xs">Shipped</span>
                  )}
                  {o.status === "Delivered" && (
                    <span className="bg-[#95b89b] text-green px-3 py-1 rounded text-xs">Delivered</span>
                  )}
                  {o.status === "Canceled" && (
                    <span className="bg-red-200 text-red-700 px-3 py-1 rounded text-xs">Canceled</span>
                  )}
                </td>

                <td className="py-3">
                  <div className="flex gap-2">
                    {/* VIEW BUTTON */}
                    <button
                      onClick={() =>
                        navigate(`/admin/order/${o.id}`, { state: { order: o.raw } })
                      }
                      className="border px-3 py-1 text-xs rounded bg-white hover:bg-gray-100 transition"
                    >
                      View
                    </button>

                    {renderActions(o.status, o.id)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;
