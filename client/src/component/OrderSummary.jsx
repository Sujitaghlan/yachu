import React, { useState } from "react";

function OrderSummary({ cartAtCheckout }) {
  const [open, setOpen] = useState(false);

  const subtotal = cartAtCheckout.items?.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  ) || 0;

  const shipping = cartAtCheckout.deliveryCharge || 0;

  return (
    <div className="border rounded-md p-4 bg-white font-paragraph shadow-sm">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setOpen(!open)}>
        <span className="text-sm font-headline text-primary">
          Order Summary ({cartAtCheckout.items?.length || 0} Items)
        </span>
        <span>{open ? "-" : "+"}</span>
      </div>

      {open && (
        <div className="mt-4">
          {cartAtCheckout.items?.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.title} x {item.qty}</span>
              <span>Rs. {item.qty * item.price}</span>
            </div>
          ))}
          <div className="border-t pt-2 text-sm text-primary">
            <div className="flex justify-between mb-1">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Shipping</span>
              <span>Rs. {shipping}</span>
            </div>
            <div className="flex justify-between font-bold mt-1">
              <span>Total</span>
              <span>Rs. {subtotal + shipping}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
