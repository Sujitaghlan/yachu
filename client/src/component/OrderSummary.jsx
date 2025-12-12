import React, { useState } from "react";

function OrderSummary({ cartAtCheckout }) {
  const [open, setOpen] = useState(false);

  const subtotal =
    cartAtCheckout.items?.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    ) || 0;

  const totalQty =
    cartAtCheckout.items?.reduce((sum, item) => sum + item.qty, 0) || 0;

  // const discount = totalQty >= 3 ? subtotal * 0.1 : 0;
  const shipping = cartAtCheckout.deliveryCharge || 0;
  const total = subtotal + shipping;

  return (
    <div className="border rounded-md p-4 bg-white font-paragraph shadow-sm w-full max-w-md mx-auto md:mx-0">
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => setOpen(!open)}
      >
        <span className="text-sm font-headline text-primary">
          Order Summary ({cartAtCheckout.items?.length || 0} Items)
        </span>
        <span className="text-primary font-bold text-lg">
          {open ? "−" : "+"}
        </span>
      </div>

      {open && (
        <div className="mt-4">
          {cartAtCheckout.items?.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-3 border-b pb-2"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.productImg}
                  alt={item.title}
                  className="w-12 h-12 object-contain rounded"
                />
                <span className="text-sm text-primary">{item.title}</span>
              </div>
              <span className="text-sm text-primary">
                x {item.qty} = Rs. {item.price * item.qty}
              </span>
            </div>
          ))}

          <div className="border-t pt-3 text-sm text-primary">
            <div className="flex justify-between mb-1 font-medium">
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            {/* {discount > 0 && (
              <div className="flex justify-between mb-1 font-medium text-red-500">
                <span>Discount (10%)</span>
                <span>- Rs. {discount.toFixed(0)}</span>
              </div>
            )} */}
            <div className="flex justify-between mb-1 font-medium">
              <span>Shipping</span>
              <span>Rs. {shipping}</span>
            </div>
            <div className="flex justify-between font-bold mt-2 text-primary">
              <span>Total</span>
              <span>Rs. {total}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderSummary;
