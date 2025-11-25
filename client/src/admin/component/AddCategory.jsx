import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import React, { useState } from "react";
import FormField from "../../utils/FormField";


function AddCategory() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    category: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    category: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear error on change
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation example
    if (!formData.category.trim()) {
      setErrors({ category: "Category is required" });
      return;
    }

    // Submit logic here
    alert(`Submitted category: ${formData.category}\nDescription: ${formData.description}`);
  };

  return (
    <div className="min-h-screen bg-white px-4 py-5 font-paragraph flex justify-center items-start md:items-center">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-10 shadow-md rounded-md">
        {/* Header */}
        <div className="flex items-center mb-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-base md:text-lg font-paragraph text-primary hover:underline transition"
          >
            <FiArrowLeft size={24} />
            Back
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} noValidate>
          <FormField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter category name"
            error={errors.category}
          />

          <div className="mt-6">
            <FormField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description (optional)"
              textarea={false}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 md:py-4 rounded text-base md:text-lg hover:bg-blue-700 transition mt-10"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
