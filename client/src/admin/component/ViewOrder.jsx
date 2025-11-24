import { useLocation, useParams, useNavigate } from "react-router-dom";

function ViewOrder() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  if (!order)
    return (
      <div className="flex items-center justify-center min-h-screen text-lg">
        Order not found.
      </div>
    );

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
            <p><b>Name:</b> {order.customer}</p>
            <p><b>Phone:</b> {order.contact}</p>
            <p><b>Address:</b> {order.address}</p>
          </div>

          {/* Order Info */}
          <div className="p-4 border rounded-md bg-white shadow-sm">
            <h2 className="font-semibold text-lg mb-2">Order Information</h2>
            <p><b>Date:</b> {order.date}</p>
            <p><b>Payment:</b> {order.payment}</p>
            <p><b>Status:</b> {order.status}</p>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4 border rounded-md bg-white shadow-sm">
          <h2 className="font-semibold text-lg mb-4">Order Item</h2>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <img
              src="/mnt/data/3e63ff99-445b-47c5-8491-2818864c0c48.png"
              className="w-24 h-28 sm:w-20 sm:h-24 object-contain"
            />
            <div className="flex-1 text-sm sm:text-base">
              <p className="font-bold">Dandruff Case</p>
              <p>Quantity: {order.qty || 1}</p>
            </div>
            <p className="font-bold text-base sm:text-lg">
              Rs. {order.amount}
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md bg-white shadow-sm">
          <div className="space-y-1 text-sm md:text-base">
            <p>Subtotal: Rs. {order.amount}</p>
            <p>Shipping: Rs. 100</p>
          </div>
          <p className="font-bold text-lg mt-2 md:mt-0">
            Total: Rs. {order.amount + 100}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Confirm
          </button>
          <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition">
            Cancel
          </button>
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
