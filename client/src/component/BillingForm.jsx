/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormField from "../utils/FormField";
import Button from "../utils/Button";
import { useCart } from "../context/CartContext";
import OrderSummary from "./OrderSummary";

function BillingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    country: "Nepal",
    city: "",
    address: "",
    deliveryCharge: "Inside Valley",
    email: "",
    orderNotes: "",
  });

  const [errors, setErrors] = useState({});

  const deliveryOptions = [
    { label: "Inside Valley", price: 100 },
    { label: "Outside Valley", price: 200 },
  ];

  useEffect(() => {
    if (location.state?.fromCart === false) {
      const savedForm = localStorage.getItem("billingData");
      if (savedForm) setForm(JSON.parse(savedForm));
    }
  }, [location.state]);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.qty,
    0
  );

  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const discount = totalQty >= 3 ? subtotal * 0.1 : 0;
  const discountedSubtotal = subtotal - discount;

  const cartAtCheckout = {
    items: cartItems,
    deliveryCharge:
      deliveryOptions.find((o) => o.label === form.deliveryCharge)?.price || 0,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let err = {};
    if (!form.fullName) err.fullName = "Required";
    if (!form.phone) err.phone = "Required";
    else if (!/^\d{10}$/.test(form.phone))
      err.phone = "Phone must be 10 digits";
    if (!form.address) err.address = "Required";
    if (!form.email) err.email = "Required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Save billing and cart info to localStorage
    localStorage.setItem("billingData", JSON.stringify(form));
    localStorage.setItem("cartAtCheckout", JSON.stringify(cartAtCheckout));

    // Navigate to payment page
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start px-4 md:px-6 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-6xl p-6 shadow-md rounded flex flex-col md:flex-row gap-8 font-paragraph"
      >
        <div className="w-full md:w-80 space-y-4 order-1 md:order-2 md:sticky md:top-24">
          <OrderSummary cartAtCheckout={cartAtCheckout} />
        </div>

        <div className="flex-1 space-y-5 order-2 md:order-1">
          <FormField
            label="Full Name *"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
          <FormField
            label="Phone *"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            error={errors.phone}
          />
          <FormField
            label="Country *"
            name="country"
            value={form.country}
            readOnly
          />
          <FormField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
          <FormField
            label="Address *"
            name="address"
            value={form.address}
            onChange={handleChange}
            error={errors.address}
          />
          <FormField
            label="Delivery Charge"
            name="deliveryCharge"
            value={form.deliveryCharge}
            onChange={handleChange}
            options={deliveryOptions}
          />
          <FormField
            label="Email *"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            label="Order Notes"
            name="orderNotes"
            value={form.orderNotes}
            onChange={handleChange}
            textarea
          />

          <Button background="#003366" textColor="#fff" type="submit">
            Continue To Payment
          </Button>
        </div>
      </form>
    </div>
  );
}

export default BillingForm;
