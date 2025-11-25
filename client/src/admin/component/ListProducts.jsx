import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ListProducts() {
  const navigate = useNavigate();

  // Sample products state
  const [products, setProducts] = useState([
    { id: 1, name: "Dandruff Case", price: 2500, stock: 57 },
    { id: 2, name: "Hairfall Case", price: 2500, stock: 57 },
    { id: 3, name: "Baldness Case", price: 2500, stock: 57 },
    { id: 4, name: "Sachet Oil", price: 2500, stock: 57 },
    { id: 5, name: "Bottle Shampoo", price: 2500, stock: 57 },
    { id: 6, name: "Sachet Shampoo", price: 2500, stock: 57 },
  ]);

  // Navigate to Add Product page
  const handleAddProduct = () => {
    navigate('/admin/add-products');
  };

  // Navigate to Edit Product page with product ID
  const handleEditProduct = (productId) => {
    navigate(`/admin/add-products/${productId}`);
  };

  // Delete product from the list
  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  return (
    <div className="w-full font-sans text-sm p-4">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <div className="text-gray-600 text-xs flex-grow min-w-[150px] truncate">
          Manage your product inventory
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-blue-700 text-white text-xs py-1 px-3 rounded whitespace-nowrap hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          + Add Product
        </button>
      </div>

      {/* Products Table */}
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
                key={product.id}
                className="border-b border-gray-200 last:border-none shadow-md hover:shadow-xl transition-shadow duration-300 rounded"
              >
                <td className="py-4 px-2">{product.name}</td>
                <td className="py-4 px-2">Rs. {product.price}</td>
                <td className="py-4 px-2">{product.stock}</td>
                <td className="py-4 px-2">
                  <div className="flex gap-2 overflow-x-auto">
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="bg-icon text-white text-xs py-1 px-3 rounded whitespace-nowrap hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-red-600 text-white text-xs py-1 px-3 rounded whitespace-nowrap hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListProducts;
