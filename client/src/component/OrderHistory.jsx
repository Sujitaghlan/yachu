import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function OrderHistory() {
  const [openOrder, setOpenOrder] = useState(null);

  // Sample orders data
  const orders = [
    {
      id: "ORD-001",
      date: "15 Jan 2024",
      total: 2499,
      status: "Delivered",
      items: [
        { name: "Premium Watch", price: 1299, qty: 1, image: "https://via.placeholder.com/50" },
        { name: "Leather Belt", price: 599, qty: 2, image: "https://via.placeholder.com/50" }
      ]
    },
    {
      id: "ORD-002",
      date: "14 Jan 2024",
      total: 1599,
      status: "Pending",
      items: [
        { name: "Wireless Earbuds", price: 1599, qty: 1, image: "https://via.placeholder.com/50" }
      ]
    },
    {
      id: "ORD-003",
      date: "13 Jan 2024",
      total: 4299,
      status: "Processing",
      items: [
        { name: "T-shirt", price: 799, qty: 3, image: "https://via.placeholder.com/50" },
        { name: "Jeans", price: 1899, qty: 1, image: "https://via.placeholder.com/50" }
      ]
    }
  ];

  const toggleOrder = (orderId) => {
    setOpenOrder(openOrder === orderId ? null : orderId);
  };

  return (
    <div className="font-paragraph p-4">
      <h1 className="text-2xl font-headline text-primary mb-6">Order History</h1>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div 
            key={order.id} 
            className="bg-white border border-secondary rounded-lg shadow-sm overflow-hidden"
          >
            {/* Order Header - Always Visible */}
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
              onClick={() => toggleOrder(order.id)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-primary">{order.id}</h3>
                  <p className="text-sm text-tertiary mt-1">{order.date}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-primary">Rs. {order.total}</p>
                    <span className={`text-xs px-2 py-1 rounded ${
                      order.status === "Delivered" ? "bg-green-100 text-green-800" :
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-800"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <span className="text-primary text-lg">
                    {openOrder === order.id ? <FiChevronUp /> : <FiChevronDown />}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Details - Expandable */}
            {openOrder === order.id && (
              <div className="border-t border-secondary p-4 animate-fade-in-up">
                <h4 className="font-medium text-primary mb-3">Order Items ({order.items.length})</h4>
                
                <div className="space-y-3 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-primary">{item.name}</p>
                        <p className="text-sm text-tertiary">Quantity: {item.qty}</p>
                      </div>
                      <p className="font-medium text-primary">Rs. {item.price * item.qty}</p>
                    </div>
                  ))}
                </div>

                {/* Order Summary */}
                <div className="bg-white border border-secondary rounded p-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-tertiary">Subtotal:</span>
                    <span>Rs. {order.total}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-tertiary">Shipping:</span>
                    <span>Rs. 0</span>
                  </div>
                  <div className="border-t mt-2 pt-2 flex justify-between font-bold text-primary">
                    <span>Total:</span>
                    <span>Rs. {order.total}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;