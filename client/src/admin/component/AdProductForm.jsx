import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import FormField from "../../utils/FormField";
import { createAd, updateAd, getAdById } from "../../api/adApi";
import { getAllProducts } from "../../api/productApi";
import { useNavigate, useParams } from "react-router-dom";

export default function AdProductForm() {
  const navigate = useNavigate();
  const { id: adId } = useParams(); // For edit mode

  const [formData, setFormData] = useState({
    productId: "",
    discountPercent: 10,
    adContent: "",
  });

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load products for dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();
        if (res.success && res.data.length > 0) {
          setProducts(res.data);

          // Set default product if empty
          setFormData((prev) => ({
            ...prev,
            productId: prev.productId || res.data[0]._id,
          }));
        }
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Load ad data for editing
  useEffect(() => {
    if (!adId) return;

    const loadAd = async () => {
      try {
        const res = await getAdById(adId);
        if (res.success && res.ad) {
          setFormData({
            productId: res.ad.productId?._id || "",
            discountPercent: res.ad.discountPercent || 10,
            adContent: res.ad.adContent || "",
          });
        }
      } catch (err) {
        console.error("Failed to load ad:", err);
      }
    };

    loadAd();
  }, [adId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "discountPercent" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productId) {
      alert("Please select a valid product.");
      return;
    }

    // Validate ObjectId format
    if (!/^[0-9a-fA-F]{24}$/.test(formData.productId)) {
      alert("Please select a valid product.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      if (adId) {
        await updateAd(adId, formData, token);
        alert("Ad updated successfully!");
      } else {
        await createAd(formData, token);
        alert("Ad created successfully!");
      }

      navigate("/admin/ad-list");
    } catch (err) {
      console.error("Failed to save ad:", err);
      alert(err?.response?.data?.message || err.message || "Failed to save ad.");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md font-sans">
      <button
        className="flex items-center gap-2 mb-6 text-gray-700"
        onClick={() => navigate("/admin/ad-list")}
      >
        <AiOutlineArrowLeft size={20} /> Back
      </button>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block font-medium mb-1">Select Product*</label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Product</option>
                {products.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.productName}
                  </option>
                ))}
              </select>
            </div>

            <FormField
              label="Discount Percent"
              name="discountPercent"
              type="number"
              value={formData.discountPercent}
              onChange={handleChange}
              placeholder="Enter discount %"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-4">
            <FormField
              label="Ad Content"
              name="adContent"
              value={formData.adContent}
              onChange={handleChange}
              textarea={true}
              placeholder="Write ad content..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-900 text-white py-3 rounded hover:bg-blue-800 transition"
        >
          {adId ? "Update Ad" : "Add Ad"}
        </button>
      </form>
    </div>
  );
}
