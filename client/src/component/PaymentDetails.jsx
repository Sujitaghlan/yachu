import React, { useEffect, useState } from "react";
import OrderSummary from "./OrderSummary";
import PaymentMethod from "./PaymentMethod";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";   

function PaymentDetails() {
  const navigate = useNavigate();                 
  const [billing, setBilling] = useState(null);
  const [cartAtCheckout, setCartAtCheckout] = useState({ items: [], deliveryCharge: 0 });

  useEffect(() => {
    const b = localStorage.getItem("billingData");
    const c = localStorage.getItem("cartAtCheckout");

    if (b) setBilling(JSON.parse(b));
    if (c) setCartAtCheckout(JSON.parse(c));
  }, []);

  const handleChange = () => {
    navigate("/billing", { state: { fromCart: false } });
  };

  return (
    <div className="min-h-screen font-paragraph px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-4 md:sticky md:top-10 md:max-h-[calc(100vh-2.5rem)] md:overflow-y-auto">
          <OrderSummary cartAtCheckout={cartAtCheckout} />

          {billing && (
            <div className="border rounded-md bg-white p-4 text-sm shadow-sm space-y-3">

              <div className="flex justify-between items-center">
                <span><strong>Name:</strong> {billing.fullName}</span>
                <button className="text-info" onClick={handleChange}>Change</button>
              </div>

              <div className="flex justify-between items-center">
                <span><strong>Address:</strong> {billing.address}</span>
                <button className="text-info" onClick={handleChange}>Change</button>
              </div>

              <div className="flex justify-between items-center">
                <span><strong>Email:</strong> {billing.email}</span>
                <button className="text-info" onClick={handleChange}>Change</button>
              </div>

              <div className="flex justify-between items-center">
                <span><strong>Shipping:</strong> Rs. {cartAtCheckout.deliveryCharge}</span>
              </div>

            </div>
          )}
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-4">
          <PaymentMethod />
          <div className="mt-4 md:mt-auto">
            <Button
              background="#003366"
              hoverBackground="#002451"
              textColor="#FFFFFF"
              padding="14px 0"
            >
              Place Order
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PaymentDetails;
