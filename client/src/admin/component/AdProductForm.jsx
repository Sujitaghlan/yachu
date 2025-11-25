import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import FormField from "../../utils/FormField";

export default function AdProductForm() {
  const [formData, setFormData] = useState({
    product: "Dandruff Case",
    price: "Rs. 2,500",
    discountPercent: "10",
    discountedPrice: "Rs. 2,250",
    adContent: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-start py-10">
      {/* WRAPPER FOR DESKTOP VIEW */}
      <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">

        {/* Back Button */}
        <div className="flex items-center gap-2 mb-6 text-gray-800 cursor-pointer">
          <AiOutlineArrowLeft size={22} />
          <span className="text-base font-medium">Back</span>
        </div>

        {/* FORM GRID - Desktop 2 column, Mobile 1 column */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Left Side */}
          <div className="space-y-5">
            <FormField

              label="Select Product*"
              name="product"
              value={formData.product}
              onChange={handleChange}
              options={[
                { label: "Dandruff Case" },
                { label: "Skin Care" },
                { label: "Oil Control" },
              ]}
            />

            {/* Product Price */}
            <div>
              <label className="block text-xs font-medium mb-1 text-tertiary">
                Product Price*
              </label>
              <input
                readOnly
                value={formData.price}
                className="w-full border border-primary px-4 py-3 rounded text-sm bg-gray-100"
              />
            </div>

            <FormField
              label="Discount Percent*"
              name="discountPercent"
              type="number"
              value={formData.discountPercent}
              onChange={handleChange}
              placeholder="10"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-5">
            {/* Discounted Price */}
            <div>
              <label className="block text-xs font-medium mb-1 text-tertiary">
                Discounted Price*
              </label>
              <input
                readOnly
                value={formData.discountedPrice}
                className="w-full border border-primary px-4 py-3 rounded text-sm bg-gray-100"
              />
            </div>

            {/* Ad Content Textarea */}
            <FormField
              label="Ad Contents*"
              name="adContent"
              value={formData.adContent}
              onChange={handleChange}
              textarea={true}
              placeholder="Write a content you want to display in ad panel ...."
            />
          </div>

        </div>

        {/* Submit Button */}
        <button className="w-full mt-6 bg-blue-900 text-white py-3 rounded text-sm hover:bg-blue-800 transition-all">
          Submit
        </button>
      </div>
    </div>
  );
}
