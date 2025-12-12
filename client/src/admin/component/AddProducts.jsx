import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineCloudUpload } from "react-icons/ai";
import FormField from "../../utils/FormField";
import {
  createProduct,
  updateProduct,
  getProductById,
} from "../../api/productApi";
import { getCategories } from "../../api/categoryApi";
import { useNavigate, useParams } from "react-router-dom";

export default function AddProducts() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    stock: "",
    netContent: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.categories || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Load product for editing
  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      try {
        const res = await getProductById(productId);
        const p = res.product;

        setFormData({
          productName: p.productName || "",
          category: p.category?._id || "",
          price: p.price || "",
          stock: p.stock || "",
          netContent: p.netContent || "",
          description: p.description || "",
        });

        if (p.imageUrl) setImagePreview(p.imageUrl);
      } catch (err) {
        console.error("Error loading product:", err);
      }
    };

    loadProduct();
  }, [productId]);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Image change handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName || !formData.category) {
      alert("Please fill all required fields.");
      return;
    }

    // Check valid ObjectId for category
    if (!/^[0-9a-fA-F]{24}$/.test(formData.category)) {
      alert("Please select a valid category.");
      return;
    }

    try {
      setLoading(true);
      if (productId) {
        // Update product
        const response = await updateProduct(productId, { ...formData, image });
        console.log("Update product response:", response);
        alert("Product updated successfully!");
      } else {
        // Create new product
        const response = await createProduct({ ...formData, image });
        console.log("Create product response:", response);

        // If backend returns message, use it; otherwise fallback
        const successMsg =
          (response && response.message) || "Product added successfully!";
        alert(successMsg);
      }

      navigate("/admin/list-products");
    } catch (err) {
      console.error("Error saving product:", err);
      alert(
        err.response?.data?.message || err.message || "Failed to save product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans">
      <button
        className="flex items-center gap-2 mb-6 text-gray-700"
        onClick={() => navigate("/admin/list-products")}
      >
        <AiOutlineArrowLeft size={20} /> Back
      </button>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side inputs */}
          <div className="space-y-4">
            <FormField
              label="Product Name"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter product name"
            />

            <div className="space-y-2">
              <label className="block font-medium mb-1">Select Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <FormField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
            />

            <FormField
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Enter stock quantity"
            />

            <FormField
              label="Net Content"
              name="netContent"
              value={formData.netContent}
              onChange={handleChange}
              placeholder="Eg: 200ml, 1L"
            />
          </div>

          {/* Right side */}
          <div className="space-y-4">
            <FormField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              textarea={true}
              placeholder="Write product details..."
            />

            <div>
              <label className="block mb-1 font-medium">
                Upload Image{" "}
                {productId ? "" : <span className="text-red-500">*</span>}
              </label>

              <label
                htmlFor="upload"
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-blue-500"
              >
                <AiOutlineCloudUpload
                  size={30}
                  className="mx-auto mb-2 text-gray-500"
                />
                <p className="text-gray-500">
                  Drop your image here, or{" "}
                  <span className="text-blue-500 underline">browse</span>
                </p>

                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-3 w-40 h-40 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full mt-6 bg-blue-900 text-white py-3 rounded transition 
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-800"}
  `}
          disabled={loading}
        >
          {loading
            ? productId
              ? "Updating..."
              : "Adding..."
            : productId
            ? "Update Product"
            : "Add Product"}
        </button>
      </form>
    </div>
  );
}
