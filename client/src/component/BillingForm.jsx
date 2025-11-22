import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormField from "../utils/FormField";
import Button from "../utils/Button";
import { useCart } from "../context/CartContext";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function BillingForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useCart();

  const [openSummary, setOpenSummary] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone must be 10 digits";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.deliveryCharge.trim())
      newErrors.deliveryCharge = "Please select delivery area";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email))
      newErrors.email = "Invalid email format";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    localStorage.setItem("billingData", JSON.stringify(form));
    const shippingPrice = deliveryOptions.find(
      (opt) => opt.label === form.deliveryCharge
    ).price;

    const cartAtCheckout = {
      items: cartItems,
      deliveryCharge: shippingPrice,
    };
    localStorage.setItem("cartAtCheckout", JSON.stringify(cartAtCheckout));

    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start px-4 md:px-6 py-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-6xl p-6 shadow-md rounded flex flex-col md:flex-row gap-8 font-paragraph"
      >
        {/* LEFT FORM */}
        <div className="flex-1 space-y-5">
          <FormField
            label="Full Name *"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.fullName}
          />
          <FormField
            label="Phone *"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter your phone"
            error={errors.phone}
          />
          <FormField
            label="Country *"
            name="country"
            value={form.country}
            readOnly
          />
          <FormField
            label="City (Optional)"
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
            label="Delivery Charge *"
            name="deliveryCharge"
            value={form.deliveryCharge}
            onChange={handleChange}
            options={deliveryOptions}
            error={errors.deliveryCharge}
          />
          <FormField
            label="Email *"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <FormField
            label="Order Notes (Optional)"
            name="orderNotes"
            value={form.orderNotes}
            onChange={handleChange}
            textarea
          />

          <Button
            background="#003366"
            hoverBackground="#002451"
            textColor="#fff"
            type="submit"
          >
            Continue To Payment
          </Button>
        </div>

        {/* RIGHT SUMMARY (Desktop Only) */}
        <div className="hidden md:block md:sticky md:top-24 w-80 space-y-4">
          <div
            className="border border-gray-300 rounded p-3 flex justify-between items-center cursor-pointer"
            onClick={() => setOpenSummary(!openSummary)}
          >
            <span className="text-sm text-tertiary">
              Order Summary ({cartItems.length} Items)
            </span>
            <div className="flex items-center gap-2 text-sm text-tertiary">
              Rs.{" "}
              {subtotal +
                deliveryOptions.find((opt) => opt.label === form.deliveryCharge)
                  .price}
              {openSummary ? <FiChevronUp /> : <FiChevronDown />}
            </div>
          </div>

          {openSummary && (
            <div className="border border-gray-300 rounded p-3 mt-2 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImg}
                      className="w-12 h-12 object-contain"
                      alt={item.title}
                    />
                    <span className="text-sm text-primary">{item.title}</span>
                  </div>
                  <div className="text-sm text-primary">
                    x {item.qty} = Rs. {item.qty * item.price}
                  </div>
                </div>
              ))}
              <div className="text-right font-semibold text-primary">
                Subtotal: Rs. {subtotal}
              </div>
              <div className="text-right font-semibold text-primary">
                Shipping: Rs.{" "}
                {
                  deliveryOptions.find(
                    (opt) => opt.label === form.deliveryCharge
                  ).price
                }
              </div>
              <div className="text-right font-bold text-primary">
                Total: Rs.{" "}
                {subtotal +
                  deliveryOptions.find(
                    (opt) => opt.label === form.deliveryCharge
                  ).price}
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default BillingForm;
