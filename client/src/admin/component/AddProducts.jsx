import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineCloudUpload } from "react-icons/ai";
import FormField from "../../utils/FormField";

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    netContent: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans">
      {/* Back Button */}
      <button className="flex items-center gap-2 mb-6 text-gray-700">
        <AiOutlineArrowLeft size={20} /> Back
      </button>

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Side */}
        <div className="space-y-4">
          <FormField
            label="Product Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />

          <FormField    
            label="Select Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={[{ label: "Select Category" }]}
          />

          <FormField
            label="Product Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
          />

          <FormField
            label="Product Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Enter quantity"
          />

          <FormField
            label="Product Net Content"
            name="netContent"
            value={formData.netContent}
            onChange={handleChange}
            placeholder="Eg: 1L, 500ml"
          />
        </div>

        {/* Right Side */}
        <div className="space-y-4">

          <FormField
            label="Product Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            textarea={true}
            placeholder="Write product details..."
          />

          {/* Upload Image */}
          <div>
            <label className="block mb-1 font-medium">
              Upload Product Image<span className="text-red-500">*</span>
            </label>

            <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500">
              <AiOutlineCloudUpload size={30} className="mx-auto mb-2 text-gray-500" />
              <p className="text-gray-500">
                Drop your image here, or{" "}
                <span className="text-blue-500 underline">browse</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full mt-6 bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition">
        Submit
      </button>
    </div>
  );
}
