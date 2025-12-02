/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../../api/productApi";

function ListProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load products from API
  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await getAllProducts();
      if (response.success) {
        setProducts(response.data);
      } else {
        setError(response.message || "Failed to load products");
      }
    } catch (err) {
      setError("Error fetching products");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    // Optimistic UI: remove product immediately
    const prevProducts = [...products];
    setProducts(products.filter((p) => p._id !== productId));
    setMessage("");
    setError("");

    try {
      const result = await deleteProduct(productId);
      if (result.ok) {
        setMessage(result.data.message || "Product deleted successfully!");
      } else {
        setProducts(prevProducts); 
        setError(result.data.message || "Failed to delete");
      }
    } catch (err) {
      setProducts(prevProducts); 
      setError("Error deleting product");
    }

  };

  if (loading) return <div className="p-4">Loading products...</div>;

  return (
    <div className="w-full font-sans text-sm p-4">
      {/* Messages */}
      {message && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{message}</div>}
      {error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{error}</div>}

      {/* Header */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <div className="text-gray-600 text-xs flex-grow min-w-[150px] truncate">
          Manage your product inventory
        </div>

        <button
          onClick={() => navigate("/admin/add-products")}
          className="bg-blue-700 text-white text-xs py-1 px-3 rounded whitespace-nowrap hover:bg-blue-800"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[280px]">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left font-semibold pb-1 px-2">Name</th>
              <th className="text-left font-semibold pb-1 px-2">Price</th>
              <th className="text-left font-semibold pb-1 px-2">Stock</th>
              <th className="text-left font-semibold pb-1 px-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-gray-200 shadow-md hover:shadow-xl transition"
              >
                <td className="py-4 px-2">{product.productName}</td>
                <td className="py-4 px-2">Rs. {product.price}</td>
                <td className="py-4 px-2">{product.stock}</td>

                <td className="py-4 px-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/add-products/${product._id}`)}
                      className="bg-[#008000] text-white text-xs py-1 px-3 rounded hover:bg-green-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="bg-red-600 text-white text-xs py-1 px-3 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListProducts;
