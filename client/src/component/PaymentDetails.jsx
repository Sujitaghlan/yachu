import React, { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import Button from "../utils/Button";
import { createOrder } from "../api/OrderApi";

function PaymentDetails() {
  const [billing, setBilling] = useState(null);
  const [cartAtCheckout, setCartAtCheckout] = useState({ items: [], deliveryCharge: 0 });
  const [selectedMethod, setSelectedMethod] = useState("cod");
  const [paymentImage, setPaymentImage] = useState(null);
  const [buttonText, setButtonText] = useState("Place Order");
  const [loading, setLoading] = useState(false);

  // Load billing and cart info from localStorage
  useEffect(() => {
    const b = localStorage.getItem("billingData");
    const c = localStorage.getItem("cartAtCheckout");

    if (b) setBilling(JSON.parse(b));
    if (c) setCartAtCheckout(JSON.parse(c));
  }, []);

  const handlePaymentChange = (method, image) => {
    setSelectedMethod(method);
    setPaymentImage(image);
  };

  const handlePlaceOrder = async () => {
    if (!billing || cartAtCheckout.items.length === 0) {
      alert("Billing or cart info missing!");
      return;
    }

    const orderData = {
      fullName: billing.fullName,
      address: billing.address,
      phone: billing.phone,
      email: billing.email,
      deliveryCharge: cartAtCheckout.deliveryCharge,
      note: billing.orderNotes || "",
      paymentType: selectedMethod,
      products: cartAtCheckout.items.map(item => ({
        productId: item.id,
        quantity: item.qty,
        price: item.price,
      })),
      paymentImage: selectedMethod === "esewa" ? paymentImage : null,
    };

    try {
      setLoading(true);
      setButtonText("Placing Order...");

      const res = await createOrder(orderData);
      console.log("Order placed:", res);

      setButtonText(res.message || "Order Placed");
    } catch (error) {
      console.error("Failed to place order:", error);
      setButtonText("Failed. Try Again");
      alert(error.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-paragraph bg-gray-50 px-4 md:px-6 py-6 animate-fade-in-up">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT: Order Summary & Billing Info */}
        <div className="space-y-4 md:sticky md:top-10 md:max-h-[calc(100vh-2.5rem)] md:overflow-y-auto animate-slide-in-left">
          <OrderSummary cartAtCheckout={cartAtCheckout} />

          {billing && (
            <div className="border rounded-md bg-white p-6 text-paragraph shadow-md space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-tertiary font-bold">Name:</span> {billing.fullName}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tertiary font-bold">Address:</span> {billing.address}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tertiary font-bold">Email:</span> {billing.email}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tertiary font-bold">Shipping:</span> Rs. {cartAtCheckout.deliveryCharge}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Payment Method & Place Order */}
        <div className="space-y-6 animate-slide-in-right">
          <PaymentMethod onPaymentChange={handlePaymentChange} />

          <Button
            background="primary"
            hoverBackground="#002451"
            textColor="#FFFFFF"
            padding="14px 0"
            onClick={handlePlaceOrder}
            className="w-full text-lg font-bold"
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
